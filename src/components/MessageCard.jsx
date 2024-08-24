"use client"

import { CardSpotlight } from "@/components/ui/card-spotlight";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";


export default function MessageCard(message,onMessageDelete) {

    const {toast} = useToast()

const handleDeleteConfirm = async()=>{
    const response = await axios.delete(`/api/delete-message/${message._id}`)
    toast({
        title:response.data.message
    })
    onMessageDelete(message._id)
}

    return (
        <CardSpotlight className="h-60 w-96 mx-auto  text-white relative">
            <div className="absolute top-1 right-1">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="font-extrabold text-2xl"><X className="text-black" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick = {handleDeleteConfirm}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className="flex flex-col space-y-5 justify-center">
                <div>
                    <h1 className="font-extrabold text-2xl">Card Title</h1>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla suscipit cupiditate in, possimus ipsa dolor minima amet! Asperiores, recusandae ipsa! </p>
                </div>

            </div>

        </CardSpotlight>
    )
}