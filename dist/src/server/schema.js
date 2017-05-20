"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var graphql_tools_1 = require("graphql-tools");
var posts_1 = require("./api/posts");
var resolvers = lodash_1.merge(posts_1.resolvers, {});
var executableSchema = graphql_tools_1.makeExecutableSchema({
    typeDefs: posts_1.schema.slice(),
    resolvers: resolvers,
});
exports.default = executableSchema;
