"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io");
var io;
exports.io = io;
function init(server) {
    exports.io = io = socketIo(server, { origins: '*:*' });
    return io;
}
exports.init = init;
