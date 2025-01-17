"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// mongoose.connect("mongodb://localhost:27017")
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const accountSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'UserSchema', require: true },
    balance: { type: Number, require: true }
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.AccountModel = (0, mongoose_1.model)('Account', accountSchema);
const newUser = new exports.UserModel({ username: "nobtia", password: "nobtia" });
