"use client"
import {useState } from "react"
import { useSession } from "next-auth/react"

const Dashboard = () => {
  const [messages,setMessages] = useState([])
  const {data:session} = useSession()

console.log("Session",session);


  const deleteMessageHandler = (messageId)=>{
    setMessages(messages.filter((message)=>message._id !== messageId))
  }


  return (
    <div>Dashboard</div>
  )
}

export default Dashboard