import { Router } from "express";
import {ParseStatus, z} from "zod"
import jwt from "jsonwebtoken"
import { AccountModel, UserModel } from "../db/db";
import { JWT_SCRETE } from "../config";
import { authMiddleware } from "./middleware";
import bcrypt from "bcrypt"
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
    const hashedPassword = await bcrypt.hash(isValid.data.password,5)
    try{
        const user = await UserModel.create({
            username:isValid.data.username,
            password:hashedPassword
        })
        const userId = user._id
        await AccountModel.create({
            userId,
            balance:1+ Math.random()*100000
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
        // password
    })
    if(!response){
        res.status(400).send({
            msg:"creadential incorredt"
        })
        return 
    }
    const passwordCheck = await bcrypt.compare(password,response?.password)
    if(!passwordCheck){
        res.status(404).send({
            msg:"password incorrect"
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

userRouter.put("/update",authMiddleware,async(req,res)=>{
    const inputFormat = z.object({
        username : z.string().min(4).max(40).optional(),
        password : z.string().min(8).max(80).optional()
    })

    const isSafe = inputFormat.safeParse(req.body)
    if(!isSafe.success){
        res.status(400).send({
            msg:"wrong input format"
        })
        return 
    }
    
    try{  
        await UserModel.updateOne({
        // @ts-ignore
             id:req.id
        },req.body)
        res.status(200).send({
            msg:"user updated"
        })
    }catch(e){
        res.status(500).send({
            msg:"couldn't updated"
        })
    }
    
})
