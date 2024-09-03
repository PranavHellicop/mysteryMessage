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
import axios from "axios";

export default function MessageCard({message,onMessageDelete}) {

    const {toast} = useToast()
    console.log("Message",message);
    
const handleDeleteConfirm = async()=>{
    const response = await axios.delete(`/api/delete-message/${message._id}`)
    toast({
        title:response.data.message
    })
    console.log("Response",response);
    
    onMessageDelete(message._id)
}

    return (
        <CardSpotlight className="min-h-48 w-96 mx-auto text-white ">
            <div className=" ">
                <AlertDialog>
                    <AlertDialogTrigger asChild className="absolute top-1 right-1">
                        <Button variant="outline" className="px-1"><X className="text-black"/></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Do you want to permanently delete this message? Press Cancel to go back or continue to delete
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick = {handleDeleteConfirm}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className=" my-2 mx-auto  ">
                <div>
                    <p className="font-bold text-wrap  break-words">{message.content}</p>
                </div>

            </div>

        </CardSpotlight>
    )
}