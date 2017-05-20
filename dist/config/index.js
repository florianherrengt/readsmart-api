"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var development_1 = require("./development");
var production_1 = require("./production");
var test_1 = require("./test");
var env = process.env.NODE_ENV || 'development';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
var allEnvs = {
    development: development_1.development,
    test: test_1.test,
    production: production_1.production
};
var selectedEnv = allEnvs[env];
console.log({ selectedEnv: selectedEnv });
if (!selectedEnv.postgres) {
    throw new Error('Cannot find postgres in config');
}
if (!selectedEnv.rabbit) {
    throw new Error('Cannot find rabbit in config');
}
exports.default = selectedEnv;
