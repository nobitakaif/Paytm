"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function authMiddleware(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(403).send({
            msg: "token is not present in header"
        });
        return;
    }
    try {
        const reponse = jsonwebtoken_1.default.verify(token, config_1.JWT_SCRETE);
        // @ts-ignore
        req.id = token.id;
        next();
    }
    catch (e) {
        res.status(403).send({
            msg: "token invalid"
        });
    }
}
