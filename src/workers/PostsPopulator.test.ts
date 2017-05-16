import { PostsPopulator } from './PostsPopulator'
import { pgPool } from '../common/pgPool'
import { init, ch } from '../common/rabbit'
import { MockChannel } from '../mocks/MockChannel'
import { Replies } from 'amqplib'
import { MockAgent } from '../mocks/MockAgent'
import { IPost } from '../common/interfaces/Post'
import { INewspaperResponse } from '../common/interfaces/NewspaperResponse'
import * as sinon from 'sinon'
import * as Bluebird from 'bluebird'

describe('The PostPopulator', () => {
    beforeEach(async () => {
        await pgPool.query('TRUNCATE posts')
    })
    it('should consume and process on start', () => {
        const consume = jest.fn()

        const agent = new MockAgent()
        const customMockChannel = new MockChannel([{ name: 'consume', fn: consume }])

        const postPopulator = new PostsPopulator(
            pgPool,
            customMockChannel,
            agent
        )
        expect(consume).toHaveBeenCalledTimes(1)
        expect(consume).toHaveBeenCalledWith('populate-posts', postPopulator.process)
    })
    it('should return if invalid message', async () => {
        const consume = jest.fn()
        const ack = jest.fn()

        const customMockChannel = new MockChannel([{
            name: 'consume',
            fn: consume
        }, {
            name: 'ack',
            fn: ack
        }])
        const agent = new MockAgent()
        const postPopulator = new PostsPopulator(
            pgPool,
            customMockChannel,
            agent
        )

        const inputs = [
            {},
            { type: 'aa' },
            { posts: 'asdad' },
            { posts: [] }
        ]
        inputs.forEach(async (input) => {
            const msg = { content: new Buffer(JSON.stringify(input)) }
            let expectedError
            try {
                await postPopulator.process(msg)
            } catch (error) {
                expectedError = error
            }
            expect(expectedError).toBeUndefined()
        })
    })
    it('should fetch all post urls and insert it into the database', async () => {
        const consume = jest.fn()
        const ack = jest.fn()

        const customMockChannel = new MockChannel([{
            name: 'consume',
            fn: consume
        }, {
            name: 'ack',
            fn: ack
        }])
        const fetchedUrls = []
        const agent = new MockAgent([{
            fn: function get(url): Promise<Response> {
                fetchedUrls.push(url)
                const result: INewspaperResponse = {
                    title: `title${url}`,
                    top_image: 'top_image${url}',
                    text: `text${url}`,
                    url
                }
                return new Promise(resolve => resolve({
                    body: result
                }))
            }
        }])
        const postPopulator = new PostsPopulator(
            pgPool,
            customMockChannel,
            agent
        )

        const posts: IPost[] = [1, 2, 3, 4].map(nb => ({
            title: 'test' + nb,
            url: 'http://test' + nb,
            type: 'reddit'
        }))

        const msg = { content: new Buffer(JSON.stringify({ type: 'reddit', posts })) }
        try {
            await postPopulator.process(msg)
            const results = await pgPool.query('SELECT * FROM posts')
            results.rows.forEach((row, index) => {
                expect(row).toEqual(expect.objectContaining(posts[index]))
            })
            expect(
                JSON.stringify(results.rows.map(({ url }) => url))
            ).toEqual(
                JSON.stringify(posts.map(({ url }) => url))
                )
        } catch (error) {
            console.error(error)
            throw new Error(error)
        }
    })
})