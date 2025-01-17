import { BrowserRouter, Route, Routes } from "react-router-dom"
import {  Signup } from "./components/signup"
import { useEffect, useRef } from "react"
import { DashBoard } from "./components/dashboard"
import { SignIn } from "./components/signin"

function App() {
  const inputRef = useRef()
  function send(){

  }
  useEffect(()=>{

  })
  return <div className="bg-slate-200 h-screen">
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashBoard/>} />
        
        <Route path="/signup" element={<Signup inputRef={inputRef} authFn={send} to={"/signin"} label={"signin"} text={"i have already account "} type="secondry" buttonTitle={"Signup"} link={""}name="Signup"/>}/> 
        <Route path="/signin" element={<SignIn inputRef={inputRef} authFn={send} label={"signup"} to={"/singup"} text="i don't have acount " type="secondry" buttonTitle={"Signin"} link={""}name="Signin"/>}/>
      </Routes>
    </BrowserRouter>
  </div>
}

export default App
