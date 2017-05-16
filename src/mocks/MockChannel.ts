import { Channel, Options, Replies, Message } from 'amqplib'
import * as Bluebird from 'bluebird'

export class MockChannel implements Channel {
    constructor(public functions?: { name?: string, fn: Function }[]) {
        this.functions.forEach(({ name, fn }) => {
            this[name || fn.name] = fn.bind(this)
        })
    }
    close(): Bluebird<void> {
        throw new Error("Method not implemented.");
    }
    assertQueue(queue: string, options?: Options.AssertQueue): Bluebird<Replies.AssertQueue> {
        throw new Error("Method not implemented.");
    }
    checkQueue(queue: string): Bluebird<Replies.AssertQueue> {
        throw new Error("Method not implemented.");
    }
    deleteQueue(queue: string, options?: Options.DeleteQueue): Bluebird<Replies.DeleteQueue> {
        throw new Error("Method not implemented.");
    }
    purgeQueue(queue: string): Bluebird<Replies.PurgeQueue> {
        throw new Error("Method not implemented.");
    }
    bindQueue(queue: string, source: string, pattern: string, args?: any): Bluebird<Replies.Empty> {
        throw new Error("Method not implemented.");
    }
    unbindQueue(queue: string, source: string, pattern: string, args?: any): Bluebird<Replies.Empty> {
        throw new Error("Method not implemented.");
    }
    assertExchange(exchange: string, type: string, options?: Options.AssertExchange): Bluebird<Replies.AssertExchange> {
        throw new Error("Method not implemented.");
    }
    checkExchange(exchange: string): Bluebird<Replies.Empty> {
        throw new Error("Method not implemented.");
    }
    deleteExchange(exchange: string, options?: Options.DeleteExchange): Bluebird<Replies.Empty> {
        throw new Error("Method not implemented.");
    }
    bindExchange(destination: string, source: string, pattern: string, args?: any): Bluebird<Replies.Empty> {
        throw new Error("Method not implemented.");
    }
    unbindExchange(destination: string, source: string, pattern: string, args?: any): Bluebird<Replies.Empty> {
        throw new Error("Method not implemented.");
    }
    publish(exchange: string, routingKey: string, content: Buffer, options?: Options.Publish): boolean {
        throw new Error("Method not implemented.");
    }
    sendToQueue(queue: string, content: Buffer, options?: Options.Publish): boolean {
        throw new Error("Method not implemented.");
    }
    consume(queue: string, onMessage: (msg: Message) => any, options?: Options.Consume): Bluebird<Replies.Consume> {
        throw new Error("Method not implemented.");
    }
    cancel(consumerTag: string): Bluebird<Replies.Empty> {
        throw new Error("Method not implemented.");
    }
    get(queue: string, options?: Options.Get): Bluebird<boolean | Message> {
        throw new Error("Method not implemented.");
    }
    ack(message: Message, allUpTo?: boolean): void {
        throw new Error("Method not implemented.");
    }
    ackAll(): void {
        throw new Error("Method not implemented.");
    }
    nack(message: Message, allUpTo?: boolean, requeue?: boolean): void {
        throw new Error("Method not implemented.");
    }
    nackAll(requeue?: boolean): void {
        throw new Error("Method not implemented.");
    }
    reject(message: Message, requeue?: boolean): void {
        throw new Error("Method not implemented.");
    }
    prefetch(count: number, global?: boolean): Bluebird<Replies.Empty> {
        throw new Error("Method not implemented.");
    }
    recover(): Bluebird<Replies.Empty> {
        throw new Error("Method not implemented.");
    }
    addListener(event: string | symbol, listener: Function): this {
        throw new Error("Method not implemented.");
    }
    on(event: string | symbol, listener: Function): this {
        throw new Error("Method not implemented.");
    }
    once(event: string | symbol, listener: Function): this {
        throw new Error("Method not implemented.");
    }
    prependListener(event: string | symbol, listener: Function): this {
        throw new Error("Method not implemented.");
    }
    prependOnceListener(event: string | symbol, listener: Function): this {
        throw new Error("Method not implemented.");
    }
    removeListener(event: string | symbol, listener: Function): this {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(event?: string | symbol): this {
        throw new Error("Method not implemented.");
    }
    setMaxListeners(n: number): this {
        throw new Error("Method not implemented.");
    }
    getMaxListeners(): number {
        throw new Error("Method not implemented.");
    }
    listeners(event: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    emit(event: string | symbol, ...args: any[]): boolean {
        throw new Error("Method not implemented.");
    }
    eventNames(): any {
        throw new Error("Method not implemented.");
    }
    listenerCount(type: string | symbol): number {
        throw new Error("Method not implemented.");
    }

}