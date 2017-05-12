import { QueryResult } from 'pg'

export interface IPost {
    title: string,
    url: string,
    type: string,
    image?: string,
    text?: string
}

export interface IQueryResultPosts extends QueryResult {
    rows: IPost[]
}