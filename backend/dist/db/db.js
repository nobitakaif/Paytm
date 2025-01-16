"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// mongoose.connect("mongodb://localhost:27017")
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
const newUser = new exports.UserModel({ username: "nobtia", password: "nobtia" });
