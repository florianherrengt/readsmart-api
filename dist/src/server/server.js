"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pgPool_1 = require("../common/pgPool");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var graphql_server_express_1 = require("graphql-server-express");
var schema_1 = require("./schema");
var agent = require("superagent");
var LinkFetcher_1 = require("../common/LinkFetcher");
var posts_1 = require("../common/repositories/posts");
var App = (function () {
    function App(ch) {
        this.ch = ch;
    }
    App.prototype.create = function () {
        var linkFetcher = new LinkFetcher_1.LinkFetcher(agent, this.ch);
        var postsRepository = new posts_1.PostsRepository(pgPool_1.pgPool, linkFetcher);
        var app = express();
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        var context = {
            postsRepository: postsRepository
        };
        app.use('/graphql', graphql_server_express_1.graphqlExpress({
            schema: schema_1.default,
            context: context
        }));
        app.use('/graphiql', graphql_server_express_1.graphiqlExpress({
            endpointURL: '/graphql'
        }));
        return app;
    };
    return App;
}());
exports.App = App;
// app.get('/', (request, response) => {
//   response.json({ ok: 1 });
// });
// export { app };
