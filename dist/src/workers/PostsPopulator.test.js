"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var PostsPopulator_1 = require("./PostsPopulator");
var pgPool_1 = require("../common/pgPool");
var rabbit_1 = require("../common/rabbit");
var MockChannel_1 = require("../mocks/MockChannel");
var MockAgent_1 = require("../mocks/MockAgent");
describe('The PostPopulator', function () {
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pgPool_1.pgPool.query('TRUNCATE posts')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, pgPool_1.pgPool.end()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should consume and process on start', function () { return __awaiter(_this, void 0, void 0, function () {
        var consume, assertQueue, agent, customMockChannel, postPopulator, queueName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    consume = jest.fn();
                    assertQueue = jest.fn();
                    agent = new MockAgent_1.MockAgent();
                    customMockChannel = new MockChannel_1.MockChannel([
                        { name: 'consume', fn: consume },
                        { name: 'assertQueue', fn: assertQueue }
                    ]);
                    postPopulator = new PostsPopulator_1.PostsPopulator(pgPool_1.pgPool, customMockChannel, agent);
                    return [4 /*yield*/, postPopulator.start()];
                case 1:
                    _a.sent();
                    expect(consume).toHaveBeenCalledTimes(1);
                    queueName = consume.mock.calls[0][0];
                    expect(queueName).toEqual(rabbit_1.queues.POPULATE_POSTS);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return if invalid message', function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var consume, ack, customMockChannel, agent, postPopulator, inputs;
        return __generator(this, function (_a) {
            consume = jest.fn();
            ack = jest.fn();
            customMockChannel = new MockChannel_1.MockChannel([{
                    name: 'consume',
                    fn: consume
                }, {
                    name: 'ack',
                    fn: ack
                }]);
            agent = new MockAgent_1.MockAgent();
            postPopulator = new PostsPopulator_1.PostsPopulator(pgPool_1.pgPool, customMockChannel, agent);
            inputs = [
                {},
                { type: 'aa' },
                { posts: 'asdad' },
                { posts: [] }
            ];
            inputs.forEach(function (input) { return __awaiter(_this, void 0, void 0, function () {
                var msg, expectedError, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            msg = { content: new Buffer(JSON.stringify(input)) };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, postPopulator.process(msg)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            expectedError = error_1;
                            return [3 /*break*/, 4];
                        case 4:
                            expect(expectedError).toBeUndefined();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); });
    it('should fetch all post urls and insert it into the database', function () { return __awaiter(_this, void 0, void 0, function () {
        var consume, ack, sendToQueue, customMockChannel, fetchedUrls, agent, postPopulator, posts, msg, results, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    consume = jest.fn();
                    ack = jest.fn();
                    sendToQueue = jest.fn();
                    customMockChannel = new MockChannel_1.MockChannel([{
                            name: 'consume',
                            fn: consume
                        }, {
                            name: 'ack',
                            fn: ack
                        }, {
                            name: 'sendToQueue',
                            fn: sendToQueue
                        }]);
                    fetchedUrls = [];
                    agent = new MockAgent_1.MockAgent([{
                            fn: function get(url) {
                                fetchedUrls.push(url);
                                var result = {
                                    title: "title" + url,
                                    top_image: 'top_image${url}',
                                    text: "text" + url,
                                    url: url
                                };
                                return new Promise(function (resolve) { return resolve({
                                    body: result
                                }); });
                            }
                        }]);
                    postPopulator = new PostsPopulator_1.PostsPopulator(pgPool_1.pgPool, customMockChannel, agent);
                    posts = [1, 2, 3, 4].map(function (nb) { return ({
                        title: 'test' + nb,
                        url: 'http://test' + nb,
                        type: 'reddit'
                    }); });
                    msg = { content: new Buffer(JSON.stringify({ type: 'reddit', posts: posts })) };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, postPopulator.process(msg)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, pgPool_1.pgPool.query('SELECT * FROM posts ORDER BY title')];
                case 3:
                    results = _a.sent();
                    results.rows.forEach(function (row, index) {
                        expect(row).toEqual(expect.objectContaining(posts[index]));
                    });
                    expect(JSON.stringify(results.rows.map(function (_a) {
                        var url = _a.url;
                        return url;
                    })))
                        .toEqual(JSON.stringify(posts.map(function (_a) {
                        var url = _a.url;
                        return url;
                    })));
                    expect(sendToQueue).toBeCalledWith(rabbit_1.queues.NEW_POSTS, new Buffer(JSON.stringify({ type: 'reddit' })));
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.error(error_2);
                    throw new Error(error_2);
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
