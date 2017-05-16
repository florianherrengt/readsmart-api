import { SuperAgent, Response, SuperAgentRequest } from 'superagent'
import { Stream } from 'stream'

export class MockAgent implements SuperAgent<SuperAgentRequest> {
    constructor(public functions: { name?: string, fn: Function }[] = []) {
        this.functions.forEach(({ name, fn }) => {
            this[name || fn.name] = fn.bind(this)
        })
    }
    parse(fn): this {
        throw new Error("Method not implemented.");
    }
    pipe(stream: NodeJS.WritableStream, options?: Object): NodeJS.WritableStream {
        throw new Error("Method not implemented.");
    }
    saveCookies(res: Response): void {
        throw new Error("Method not implemented.");
    }
    get(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    post(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    put(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    head(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    del(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    delete(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    options(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    trace(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    copy(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    lock(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    mkcol(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    move(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    purge(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    propfind(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    proppatch(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    unlock(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    report(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    mkactivity(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    checkout(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    merge(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    notify(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    subscribe(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    unsubscribe(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    patch(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    search(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    connect(url: string): SuperAgentRequest {
        throw new Error("Method not implemented.");
    }
    attachCookies(req: SuperAgentRequest): void {
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
    eventNames(): (string | symbol)[] {
        throw new Error("Method not implemented.");
    }
    listenerCount(type: string | symbol): number {
        throw new Error("Method not implemented.");
    }
}