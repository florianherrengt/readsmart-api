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
var pgPool = require("../common/pgPool");
var rabbit_1 = require("../common/rabbit");
var LinkFetcher = (function () {
    function LinkFetcher(agent, ch) {
        this.agent = agent;
        this.ch = ch;
    }
    LinkFetcher.prototype.getExistingPosts = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pgPool.query('SELECT * FROM posts WHERE type = $1', [type])];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.rows];
                }
            });
        });
    };
    LinkFetcher.prototype.handler = function (_a) {
        var type = _a.type, posts = _a.posts;
        return __awaiter(this, void 0, void 0, function () {
            var existingsPosts, existingsPostsUrl, postsToInsert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getExistingPosts(type)];
                    case 1:
                        existingsPosts = _a.sent();
                        existingsPostsUrl = existingsPosts.map(function (_a) {
                            var url = _a.url;
                            return url;
                        });
                        postsToInsert = posts.filter(function (post) { return !~existingsPostsUrl.indexOf(post.url); });
                        this.ch.sendToQueue(rabbit_1.queues.POPULATE_POSTS, new Buffer(JSON.stringify({
                            type: type,
                            posts: postsToInsert
                        })));
                        return [2 /*return*/, { existingsPosts: existingsPosts, postsToInsert: postsToInsert }];
                }
            });
        });
    };
    LinkFetcher.prototype.getReddit = function (sub) {
        return __awaiter(this, void 0, void 0, function () {
            var response, rawPosts, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("LinkFetcher.getReddit(" + sub + ")");
                        return [4 /*yield*/, this.agent
                                .get("https://www.reddit.com/r/" + sub + ".json")
                                .set('User-Agent', 'readsmartserver4z6z826Yj84Qmc99qJe6')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.body];
                    case 2:
                        rawPosts = (_a.sent()).data.children;
                        posts = rawPosts
                            .filter(function (_a) {
                            var distinguished = _a.data.distinguished;
                            return distinguished !== 'moderator';
                        })
                            .map(function (_a) {
                            var _b = _a.data, url = _b.url, title = _b.title, ups = _b.ups;
                            return ({ url: url, title: title, ups: ups });
                        })
                            .filter(function (_a) {
                            var url = _a.url;
                            return url;
                        });
                        return [4 /*yield*/, this.handler({ posts: posts, type: "reddit:" + sub })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LinkFetcher;
}());
exports.LinkFetcher = LinkFetcher;
