import mongoose, { Model, model, Schema } from "mongoose";
import { string } from "zod";
// mongoose.connect("mongodb://localhost:27017")
const UserSchema = new Schema({
    username : {type:String , required:true,unique:true},
    password : {type:String , required:true}
})

const accountSchema = new Schema({
    userId : {type:Schema.Types.ObjectId,ref:'UserSchema',require:true},
    balance :{type:Number, require:true}

})
export const UserModel = model('User',UserSchema)
export const AccountModel = model('Account',accountSchema)
const newUser = new UserModel({username:"nobtia",password:"nobtia"})
