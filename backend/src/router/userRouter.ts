import { Router } from "express";
import {ParseStatus, z} from "zod"
import jwt from "jsonwebtoken"
import { UserModel } from "../db/db";
import { JWT_SCRETE } from "../config";
export const userRouter = Router()

userRouter.post('/signup',async (req,res)=>{
    const inputFormat = z.object({
        username : z.string().min(4).max(49),
        password: z.string().min(8).max(80)
    })

    const isValid = inputFormat.safeParse(req.body)

    if(!isValid.success){
        res.status(400).send({
            msg:"you send wrong input format"
        })
        return
    }
    
    try{
        await UserModel.create({
            username:isValid.data.username,
            password:isValid.data.password
        })
        res.status(200).send({
            msg:"you're are successfully logged-in"
        })
    }catch(e){
        res.status(500).send({
            msg:console.log(e)
        })
    }
})

userRouter.post('/signin',async(req,res)=>{
    const inputFormat = z.object({
        username : z.string().min(4).max(49),
        password: z.string().min(8).max(80)
    })

    const isValid = inputFormat.safeParse(req.body)

    if(!isValid.success){
        res.status(400).send({
            msg:"you send wrong input format"
        })
        return
    }
    const username = req.body.username
    const password = req.body.password

    const response = await UserModel.findOne({
        username,
        password
    })
    if(!response){
        res.status(400).send({
            msg:"creadential incorredt"
        })
        return 
    }
    const token = jwt.sign({
        id : response._id
    },JWT_SCRETE)
    
    res.status(200).send({
        token
    })
})

