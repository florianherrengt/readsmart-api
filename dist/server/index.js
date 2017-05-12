"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agent = require("superagent");
var rabbit = require("../common/rabbit");
var LinkFetcher_1 = require("../common/LinkFetcher");
var server_1 = require("./server");
Promise.all([
    rabbit.init(),
    server_1.app.listen(3000)
]).then(function () {
    console.log('rabbitmq is ready');
    console.log('server listing on port 3000');
    var linkFetcher = new LinkFetcher_1.LinkFetcher(agent, rabbit.ch);
    return linkFetcher.getReddit('javascript').then(function (posts) {
        console.log(posts);
    });
}).catch(function (error) {
    console.log(error);
});
