import { PostsRepository } from '../repositories/posts'

export interface IContext {
    postsRepository: PostsRepository
}