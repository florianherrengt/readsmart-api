"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis = require("redis");
var redisClient = redis.createClient();
exports.redisClient = redisClient;
