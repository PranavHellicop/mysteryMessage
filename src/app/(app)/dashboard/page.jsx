"use client"
import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"
import MessageCard from "@/components/MessageCard"
import { Button } from "@/components/ui/moving-border";
import { useRef } from "react"
import PaginationComp from "@/components/PaginationComp"
import { useSearchParams } from "next/navigation"

const Dashboard = () => {
  const [messages, setMessages] = useState([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [isTogglingSwitch, setIsTogglingSwitch] = useState(false)

  const searchParams = useSearchParams()
  const PAGE = searchParams.get("page") ?? 1
  const PER_PAGE = searchParams.get("per_page") ?? 5

  const ref = useRef()
  const { toast } = useToast()
  const { data: session } = useSession()



  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })
  const { register, watch, setValue } = form

  const acceptMessages = watch("accept-messages")


  const deleteMessageHandler = (messageId) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const fetchMessages = useCallback(async () => {
    setIsLoadingMessages(true)

    try {
      const response = await axios.get(`/api/get-messages?page=${PAGE}&per_page=${PER_PAGE}`)

      if (response.data.success) {
        setMessages(response.data.message)
      }

      toast({
        title: "Messages Fetched",
        description: "Now showing latest messages"
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: error.response.data.message
        })
      }
    } finally {
      setIsLoadingMessages(false)

    }

  }, [])

  async function fetchAcceptingMessages() {
    setIsTogglingSwitch(true)
    try {
      const response = await axios.get("/api/accept-messages")
      setValue("accept-messages", response.data.isAcceptingMessages)

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: error.response.data.message
        })
      }
    } finally {
      setIsTogglingSwitch(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    fetchAcceptingMessages()
  }, [setValue])

  // :TODO:USECALLBACK

  async function toggleAcceptMessage() {
    setIsTogglingSwitch(true)
    try {
      const response = await axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages
      })
      setValue("accept-messages", !acceptMessages)


      if (response.data.success) {
        toast({
          title: response.data.message,

        })

      }


    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: error.response.data.message
        })
      }
    } finally {
      setIsTogglingSwitch(false)
    }

  }

  const handleCopy = (e) => {
    const textToCopy = ref.current?.innerText
    console.log(textToCopy)
    navigator.clipboard.writeText(textToCopy).then(() => {
      console.log('Text copied to clipboard');
      toast({
        title: "Link copied"
      })
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="p-2 space-y-3">
      <div className="space-y-3">
        <h1 className="font-extrabold">Welcome to your Dashboard</h1>
        <div className="space-y-2">
          <p>Copy your unique Link</p>
          <div className="flex space-x-3 items-center w-full">
            <p id="unique-link" ref={ref}>{`http://localhost:3000/u/${session?.user?.username}`}</p>
            <Button
              borderRadius="1.5rem"
              className=" text-white dark:bg-white z-10"
              containerClassName="h-12 w-24"
              onClick={handleCopy}
            >
              Copy
            </Button>

          </div>
        </div>
        <div>
          <Switch
            {...register("accept-messages")}
            checked={acceptMessages}
            onCheckedChange={toggleAcceptMessage}
            disabled={isTogglingSwitch} />
        </div>
        <Separator
          className="bg-gray-300"
        />
      </div>
      <div className="flex flex-wrap items-center justify-center space-y-3">
        {(isLoadingMessages) ?
          <div>
            <Loader2 className="animate-spin" />
          </div> 
          :
          
          messages.length !== 0 ?
          <>
          {
            messages.map((message) => (
              <MessageCard
                key={message._id}
                message={message}
                onMessageDelete={deleteMessageHandler} />
          ))}
          <PaginationComp />
          </>
            :
            <div>
              <p>No Messages Found</p>
            </div>
        }
      </div>

    </div>


  )
}

export default Dashboard