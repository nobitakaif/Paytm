import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SCRETE } from "../config";
export function authMiddleware (req:Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"]
    if(!token){
        res.status(403).send({
            msg:"token is not present in header"
        })
        return
    }
    
    try{
        const reponse = jwt.verify(token as string,JWT_SCRETE)
        // @ts-ignore
        req.id = token.id
        next()
    }catch(e){
        res.status(403).send({
            msg:"token invalid"
        })
    }
}