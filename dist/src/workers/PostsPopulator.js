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
Object.defineProperty(exports, "__esModule", { value: true });
var rabbit_1 = require("../common/rabbit");
var PostsPopulator = (function () {
    function PostsPopulator(pgPool, ch, agent) {
        this.pgPool = pgPool;
        this.ch = ch;
        this.agent = agent;
    }
    PostsPopulator.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Consume " + rabbit_1.queues.POPULATE_POSTS);
                        return [4 /*yield*/, this.ch.assertQueue(rabbit_1.queues.POPULATE_POSTS)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.ch.consume(rabbit_1.queues.POPULATE_POSTS, function (msg) { return _this.process(msg); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostsPopulator.prototype.process = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, type_1, posts, newPostsMsg, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Consuming " + rabbit_1.queues.POPULATE_POSTS, new Date());
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        if (!msg) return [3 /*break*/, 3];
                        _a = JSON.parse(msg.content.toString()), type_1 = _a.type, posts = _a.posts;
                        if (!type_1 || !posts) {
                            return [2 /*return*/, this.ch.ack(msg)];
                        }
                        if (!posts.length) {
                            return [2 /*return*/, this.ch.ack(msg)];
                        }
                        return [4 /*yield*/, Promise.all(posts.map(function (post) {
                                return _this.agent.get("https://dj96a3dxm6.execute-api.us-east-1.amazonaws.com/prod?url=" + post.url).then(function (response) {
                                    var _a = response.body, text = _a.text, top_image = _a.top_image;
                                    return _this.pgPool.query("INSERT INTO posts (title, url, type, image, text, created_at) VALUES ($1, $2, $3, $4, $5, $6)", [post.title, post.url, type_1, top_image, encodeURIComponent(text), new Date()]);
                                });
                            }))];
                    case 2:
                        _b.sent();
                        newPostsMsg = { type: type_1 };
                        this.ch.sendToQueue(rabbit_1.queues.NEW_POSTS, new Buffer(JSON.stringify({ type: type_1 })));
                        this.ch.ack(msg);
                        console.log('completed');
                        _b.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        throw new Error(error_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return PostsPopulator;
}());
exports.PostsPopulator = PostsPopulator;
