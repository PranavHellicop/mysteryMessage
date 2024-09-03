"use client";

import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import { carouselMessages } from "@/helpers/suggestion-data";
import { Button } from "@/components/ui/moving-border";
import { useRouter } from "next/navigation";


export default function Page() {

  const router = useRouter()

  return (
    <div className="h-[30rem]  w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased md:space-y-16 ">
      <h1 className="text-white  font-bold">Dive into the world of mysteryMessages!</h1>
      <Carousel
        className="w-full max-w-xs absolute top-80 z-10 "
        plugins={[Autoplay({ delay: 3000 })]}
      >
        <CarouselContent>
          {carouselMessages.map((message) => (
            <CarouselItem key={message.id}>
         
                <Card className="flex flex-col text-center justify-center">
                  <CardHeader className="text-gray-400">{message.title}</CardHeader>
                  <CardContent className="flex md:h-28 items-center justify-center p-2">
                    <span className="text-xl font-semibold">{message.content}</span>
                  </CardContent>
                </Card>
          
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
  

      <Button
        borderRadius="1.5rem"
        className=" text-white dark:bg-white z-10 text-xl"
        containerClassName="w-40 h-16"
        onClick={()=>router.push("/sign-up")}
      >
        SignUp Now
      </Button>
        
      <BackgroundBeams />
    </div>
  )
}
