import * as redis from 'redis'

const redisClient = redis.createClient()

export { redisClient }
