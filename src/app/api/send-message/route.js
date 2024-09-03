import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request) {
    await dbConnect()

    const { username, content } =await request.json()
    console.log("username inside sendmessage",username);
    
    
    try {
        const user = await UserModel.findOne({
            username
        })

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        }
        const acceptingMessage = user.isAcceptingMessages
        if (!acceptingMessage) {
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting messages at the moment"
                },
                {
                    status: 403
                }
            )
        }

        const newMessage = {
            content,
            createdAt:new Date()
        }

        user.messages.push(newMessage)

        await user.save()
        return Response.json(
            {
                success: true,
                message:"Message sent successfully"
            },
            {
                status: 401
            }
        )

    } catch (error) {
        console.log("Error adding messages");
        
        return Response.json(
            {
                success: false,
                message: "Internal server error"
            },
            {
                status: 500
            }
        )
    }



}