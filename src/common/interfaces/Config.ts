export interface IConfig {
    postgres: string,
    rabbit: string,
    app: {
        port: number
    }
}