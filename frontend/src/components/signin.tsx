import { useRef, useState } from "react"
import {  Link, useNavigate } from "react-router-dom"
import axios from "axios"

type singin={
    name : string,
    link : string,
    buttonTitle: string,
    type: "primary" |"secondry"
    authFn:()=>void,
    inputRef:any,
    to:any,
    label:any
    text:string
}
export function SignIn(props:singin){
    const usernameRef = useRef()
    let navigate = useNavigate()
    const passwordRef = useRef()
    const [username,setUsername]= useState()
    const [password,setPassword]=useState()
    async function sendButton(){
        const response =await axios.post("http://localhost:8000/api/user/signin",{
            username,
            password
        })  
        
        if(response.status==200 ){
            alert("you're logged in")
            // @ts-ignore
            usernameRef.current.value = ""
            // @ts-ignore
            passwordRef.current.value = ""
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
        }
        

    }
    return <div className="h-screen bg-slate-200  w-full flex justify-center items-center">
        <div className="rounded-2xl h-80 w-72 bg-white shadow-2xl shadow-cyan-300">
            <div className="text-5xl flex items-center w-full justify-center pt-5 font-serif">
                {props.name}
            </div>
            <div className=" flex flex-col h-36  justify-center items-center ">
                <InputBox onChange={(e:any)=>{
                    setUsername(e.target.value)
                }} inputRef={usernameRef} placeholder={"Username"}/>
                <InputBox onChange={(e:any) =>{
                    setPassword(e.target.value)
                }} inputRef={passwordRef}placeholder="password"/>
                
            </div>
            <div className="flex flex-col justify-center items-center ">
                <Button send={props.authFn} button={props.buttonTitle} onClick={sendButton} type={props.type}/>
            </div>
            <div className=" flex items-center justify-center mt-3 " >
                <div>{props.text}</div> 
                <Link className="pointer pl-1 cursor-pointer text-blue-400" to={props.to}>{props.label}</Link>
            </div>
        </div>
        

    </div>
}

function InputBox(props:any){
    
    return <div>
        <input type="text" ref={props.inputRef} onChange={props.onChange} placeholder={props.placeholder} className="rounded-md w-60 p-2 outline-none font-serif bg-slate-200 m-2 h-10 shadow-lg hover:shadow-cyan-300"/>    
    </div>
}
type buttonType={
    type : "primary" | "secondry",
    button : string,
    send:()=>void
    onClick:()=>void
}
const button = {
    primary : "bg-slate-300",
    secondry : "bg-blue-400 text-white"
} 
function Button(props:buttonType){

    return <div onClick={props.onClick}  className={`${button[props.type]} cursor-pointer h-10 w-60 rounded-lg flex pb-2 items-center text-2xl justify-center `}>
        {props.button}
    </div>
}