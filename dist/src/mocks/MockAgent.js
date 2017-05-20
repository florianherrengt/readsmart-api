"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockAgent = (function () {
    function MockAgent(functions) {
        if (functions === void 0) { functions = []; }
        var _this = this;
        this.functions = functions;
        this.functions.forEach(function (_a) {
            var name = _a.name, fn = _a.fn;
            _this[name || fn.name] = fn.bind(_this);
        });
    }
    MockAgent.prototype.parse = function (fn) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.pipe = function (stream, options) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.saveCookies = function (res) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.get = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.post = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.put = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.head = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.del = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.delete = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.options = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.trace = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.copy = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.lock = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.mkcol = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.move = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.purge = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.propfind = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.proppatch = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.unlock = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.report = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.mkactivity = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.checkout = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.merge = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.notify = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.subscribe = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.unsubscribe = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.patch = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.search = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.connect = function (url) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.attachCookies = function (req) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.addListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.on = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.once = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.prependListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.prependOnceListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.removeListener = function (event, listener) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.removeAllListeners = function (event) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.setMaxListeners = function (n) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.getMaxListeners = function () {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.listeners = function (event) {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.eventNames = function () {
        throw new Error("Method not implemented.");
    };
    MockAgent.prototype.listenerCount = function (type) {
        throw new Error("Method not implemented.");
    };
    return MockAgent;
}());
exports.MockAgent = MockAgent;
