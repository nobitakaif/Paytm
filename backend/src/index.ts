import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { UserModel } from "./db/db"
import { userRouter } from "./router/userRouter"

mongoose.connect("mongodb://localhost:27017/paytm")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/user",userRouter)
app.listen(8000,()=>{console.log("server is running on port 8000")})