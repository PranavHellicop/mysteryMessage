// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';
// import { NextResponse } from 'next/server';
import {messages} from "../../../helpers/suggestion-data"

export async function GET() {
  await new Promise((resolve)=>setTimeout(resolve,3000)) 

  try {
    const shuffled = [...messages].sort(() => 0.5 - Math.random());
    const randomMessages = shuffled.slice(0,3)
    
    return Response.json({
      success:true,
      message:"Successfully generated Messages",
      randomMessages
    })
    
  } catch (error) {
    console.error("Error registering user",error)
        return Response.json(
            {
                success:false,
                message:"Error generating messages"
            },
  )}
    
}




























// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST() {
//  try {
//   const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."

//   const result = await streamText({
//     model: openai('gpt-3.5-turbo'),
//     prompt,
//   });
//   const suggestedMessages =  result.toDataStreamResponse()

//   return NextResponse.json({
//     success:true,
//     suggestedMessages
//   },
// {
//   status:200
// })
//  } catch (error) {
//   console.log("OpneAi Error",error);

//   return NextResponse.json(

//     {
//         success: false,
//         message: "Unexpected Error occured"
//     },
//     {
//         status: 500
//     }
// )
//  }
// }

// import { streamText } from "ai"
// import { google } from "@ai-sdk/google"

// export async function POST() {
//   try {
//     // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
//     // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
    
//     const result = await streamText({
//       model: google("models/gemini-1.5-pro-latest"),
//       prompt: prompt
//       })
//     // const result = await model.generateContentStream(prompt);
//     for await (const textPart of result.textStream) {
//       console.log(textPart);
//     }
//     return NextResponse.json({
//       success: true,
//       result
//     },
//       {
//         status: 200
//       })
//   } catch (error) {
//     console.log("Gemini Error", error);

//     return NextResponse.json(

//       {
//         success: false,
//         message: "Unexpected Error occured"
//       },
//       {
//         status: 500
//       })
//   }
// }