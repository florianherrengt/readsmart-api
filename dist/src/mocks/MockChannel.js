"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockChannel = (function () {
    function MockChannel(functions) {
        var _this = this;
        this.functions = functions;
        this.functions.forEach(function (_a) {
            var name = _a.name, fn = _a.fn;
            _this[name || fn.name] = fn.bind(_this);
        });
    }
    MockChannel.prototype.close = function () {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.assertQueue = function (queue, options) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.checkQueue = function (queue) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.deleteQueue = function (queue, options) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.purgeQueue = function (queue) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.bindQueue = function (queue, source, pattern, args) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.unbindQueue = function (queue, source, pattern, args) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.assertExchange = function (exchange, type, options) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.checkExchange = function (exchange) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.deleteExchange = function (exchange, options) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.bindExchange = function (destination, source, pattern, args) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.unbindExchange = function (destination, source, pattern, args) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.publish = function (exchange, routingKey, content, options) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.sendToQueue = function (queue, content, options) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.consume = function (queue, onMessage, options) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.cancel = function (consumerTag) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.get = function (queue, options) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.ack = function (message, allUpTo) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.ackAll = function () {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.nack = function (message, allUpTo, requeue) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.nackAll = function (requeue) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.reject = function (message, requeue) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.prefetch = function (count, global) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.recover = function () {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.addListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.on = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.once = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.prependListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.prependOnceListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.removeListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.removeAllListeners = function (event) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.setMaxListeners = function (n) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.getMaxListeners = function () {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.listeners = function (event) {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.eventNames = function () {
        throw new Error("Method not implemented.");
    };
    MockChannel.prototype.listenerCount = function (type) {
        throw new Error("Method not implemented.");
    };
    return MockChannel;
}());
exports.MockChannel = MockChannel;
