import mongoose, { Model, model, Schema } from "mongoose";
import { string } from "zod";
// mongoose.connect("mongodb://localhost:27017")
const UserSchema = new Schema({
    username : {type:String , required:true,unique:true},
    password : {type:String , required:true}
})

export const UserModel = model('User',UserSchema)

const newUser = new UserModel({username:"nobtia",password:"nobtia"})