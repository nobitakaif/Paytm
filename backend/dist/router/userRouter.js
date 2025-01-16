"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const config_1 = require("../config");
const middleware_1 = require("./middleware");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputFormat = zod_1.z.object({
        username: zod_1.z.string().min(4).max(49),
        password: zod_1.z.string().min(8).max(80)
    });
    const isValid = inputFormat.safeParse(req.body);
    if (!isValid.success) {
        res.status(400).send({
            msg: "you send wrong input format"
        });
        return;
    }
    try {
        yield db_1.UserModel.create({
            username: isValid.data.username,
            password: isValid.data.password
        });
        res.status(200).send({
            msg: "you're are successfully logged-in"
        });
    }
    catch (e) {
        res.status(500).send({
            msg: console.log(e)
        });
    }
}));
exports.userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputFormat = zod_1.z.object({
        username: zod_1.z.string().min(4).max(49),
        password: zod_1.z.string().min(8).max(80)
    });
    const isValid = inputFormat.safeParse(req.body);
    if (!isValid.success) {
        res.status(400).send({
            msg: "you send wrong input format"
        });
        return;
    }
    const username = req.body.username;
    const password = req.body.password;
    const response = yield db_1.UserModel.findOne({
        username,
        password
    });
    if (!response) {
        res.status(400).send({
            msg: "creadential incorredt"
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        id: response._id
    }, config_1.JWT_SCRETE);
    res.status(200).send({
        token
    });
}));
exports.userRouter.get("/info", middleware_1.authMiddleware, (req, res) => {
    res.send({
        msg: "token is correct"
    });
});
