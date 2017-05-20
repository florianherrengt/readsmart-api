import * as socketIo from 'socket.io'

let io;

export function init(server) {
    io = socketIo(server, { origins: '*:*' })
    return io
}

export { io }