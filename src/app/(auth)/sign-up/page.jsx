"use client"

import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import axios, { AxiosError } from "axios"
import * as  z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signUpSchema } from "@/schemas/signUpSchema"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function Page() {

  const [username, setUsername] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkingUsername, setIsCheckingUsername] = useState(false)
  const [usernameAvailableMessage, setUsernameAvailableMessage] = useState(true)
  const debouncedUsername = useDebounceCallback(setUsername, 500)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm(
    {
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        username: "",
        email: "",
        password: ""
      }
    }
  )


  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true)
        setUsernameAvailableMessage("")
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          console.log("app-->(auth)--->sign-up---->page.jsx", response)
          setUsernameAvailableMessage(response.data.message)

        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Access the response if it exists
            if (error.response) {

              setUsernameAvailableMessage(error.response.data.message)
            }
          }
        } finally {
          setIsCheckingUsername(false)
        }

      }
    }
    checkUsernameUnique()
  }, [username])


  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/sign-up", data,
        {validateStatus:(status)=>{
            return status<502
        }}
      )
      console.log("response",response);
      
      if (response.data?.success) {
        toast({
          title: "Success",
          description: response.data.message
        })
        router.push(`/verify/${username}`)
      }else{
        toast({
          title: "Signup attempt failed",
          description: response.data.message,
          variant:"destructive"
        })
      }


    } catch (error) {
      console.log("app-->(auth)--->sign-in---->page.jsx", error)
      toast({
        title: "Sign-up Failed",
        description: error.message,
        variant: "destructive"
      })
    }
    setIsSubmitting(false)

  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="mx-auto max-w-md space-y-7 ">

        <div className="text-center">
          <h2 className="text-4xl font-extrabold">Signup to mysteryMessages</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        debouncedUsername(e.target.value)
                      }}
                    />
                  </FormControl>
                  {checkingUsername && <Loader2 className="animate-spin" />}
                  <p className={`${usernameAvailableMessage === "Username is unique" ? "text-green-400" : "text-red-600"}`}>
                    {usernameAvailableMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Password"
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
                    />Please Wait
                  </>
                  :
                  "Signup"
              }
            </Button>
          </form>
        </Form>

      </div>
    </div>
  )
}