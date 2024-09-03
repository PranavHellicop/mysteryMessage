"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from '@/schemas/signInSchema'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {toast} = useToast()
  const router = useRouter()

  const form = useForm({
    resolver:zodResolver(signInSchema),
    defaultValues:{
      identifier:"",
      password:""
    }
  })

  const onSubmit = async(data)=>{
    setIsSubmitting(true)

    // console.log(data);
    // const formData = new FormData()
    // formData.append("identifier",data.identifier)
    // formData.append("password",data.password)
   
    // const result = await credentialLogin(formData)
    
    const result = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false
    })
    
  
    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
    setIsSubmitting(false);
  };
      
  

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="mx-auto max-w-md space-y-7 ">

        <div className="text-center">
          <h2 className="text-4xl font-extrabold">Signin to mysteryMessages</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Username or Email"
                      className="text-black"
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
                      className="text-black"
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
                  "Signin"
              }
            </Button>
          </form>
        </Form>

      </div>
    </div>
  )
}

export default Page