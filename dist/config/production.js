"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = {
    postgres: process.env.DATABASE_URL,
    rabbit: process.env.CLOUDAMQP_URL,
    app: {
        port: process.env.PORT
    }
};
