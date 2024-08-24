"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { verifySchema } from "@/schemas/verifySchema"

import axios from "axios"
import { useState } from "react"

const Page = () => {

    const param = useParams()
    const { toast } = useToast()
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm({
        resolver: zodResolver(verifySchema),
        defaultValues: {

        }
    })

    const {username} = param

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        
        const { code } = data
        const userData = {
            username,
            code
        }
  
        try {
            const response = await axios.post("/api/verify-code", userData)
          

            if (response.data?.success) {
                toast({
                    title: "Success",
                    description: response.data.message
                })
                setIsSubmitting(false)
                router.push(`/sign-in`)
            }


        } catch (error) {

            console.log("app-->(auth)--->sign-in---->page.jsx", error)
            toast({
                title: "Verification Failed",
                description: error.message,
                variant: "destructive"
            })
            setIsSubmitting(false)
        }

    }

    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <div className="mx-auto max-w-md space-y-7 ">

                <div className="text-center">
                    <h2 className="text-4xl font-extrabold">Verify your Account</h2>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter the verification code sent to your email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter code here"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )
                            }
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
                                    "Submit"
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Page