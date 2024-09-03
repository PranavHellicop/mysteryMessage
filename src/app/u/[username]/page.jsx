"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { messageSchema } from "@/schemas/messageSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import axios from "axios"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import  ContainedBoxes  from "@/components/ui/background-boxes";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams"



const Page = ({ params }) => {
  const { username } = params
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [suggestMessageLoading, setSuggestMessageLoading] = useState(false)
  const [suggestedMessages, setSuggestedMessages] = useState([
    { id: 51, message: "If you could spend a day in someone else's shoes, whose would it be?" },
    { id: 52, message: "What's a habit you've developed that you're proud of?" },
    { id: 53, message: "If you could bring back any past trend, what would it be?" }
  ])
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ""
    }
  })

  const { setValue } = form

  const transferListContentToTextarea = (e) => {
    const content = e.target.innerText
    setValue("content", content)

  }

  const messageSuggestions = async () => {
    setSuggestMessageLoading(true)
    try {
      const response = await axios.get("/api/suggest-messages")
      setSuggestedMessages(response.data.randomMessages)
      console.log(response);

      if (!response.data.success) {
        toast({
          title: response.data.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: error.response.data.message,
          variant: "destructive"
        })
      }
    } finally {
      setSuggestMessageLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/send-message", {
        username,
        content: data.content
      })
      toast({
        title: response.data.message
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: error.response.data.message
        })
      }
    } finally {
      setIsSubmitting(false)
      setValue("content", "")

    }
  }
  return (
    
    <div className="space-y-7 px-3 h-screen">

      <div className="flex justify-center h-2/5 m-3">
              <ContainedBoxes className="left-3 w-[500px] h-[300px]" />
              <ContainedBoxes className="right-3 w-[500px] h-[300px]" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5  w-1/3 flex flex-col justify-center">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel className="w-full text-center text-lg font-bold text-white">Your Message to <span className="bg-white text-black p-1">{username}</span></FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-40 text-black border border-gray-400 text-lg font-semibold"
                      placeholder="Enter your message here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {
                isSubmitting ?
                  <>
                    <Loader2
                      className="animate-spin"
                    />Sending
                  </>
                  :
                  "Send"
              }
            </Button>
          </form>
        </Form>
      </div>
      <Separator />
      <div>
        <Button type="submit" disabled={suggestMessageLoading} onClick={messageSuggestions}>
          {
            suggestMessageLoading ?
              <>
                <Loader2
                  className="animate-spin"
                />
              </>
              :
              "Suggest Messages"
          }
        </Button>
      </div>
      <div className="flex justify-center items-center  ">
        {suggestMessageLoading ?
          <>
            <Loader2
              className="animate-spin"
            />Suggesting
          </> :
          <>
              <ContainedBoxes className="right-3 w-[440px] h-[250px]" />
              <ContainedBoxes className="left-3 w-[440px] h-[250px]" />

          <li className="space-y-2 list-none p-2">
            <div className="w-10 h-10">

            </div>
            {suggestedMessages.map((message) => (
              
              
              <ul
                key={message.id}
                onClick={transferListContentToTextarea}
                className="font-bold text-lg rounded-lg text-gray-500 bg-yellow-100 cursor-pointer p-2"
                >{message.message}</ul>
                
              ))}
          </li>
              </>
        }
      </div>
    </div>
  )
}

export default Page