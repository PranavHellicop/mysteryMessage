import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { auth } from "@/auth";

export async function POST(request) {
    await dbConnect()


    const session = await auth()

    const user = session?.user

    if (!session || !session?.user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated"
            },
            {
                status: 401
            }
        )
    }

    const userId = user._id
    const {acceptMessages} = await request.json()
    
    

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new: true }
        )

        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Failed to update the user status to accept messages"
                },
                {
                    status: 401
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Message acceptance status updated successfully",
                updatedUser
            },
            {
                status: 200
            }
        )


    } catch (error) {
        console.log("Failed to update the user status to accept messages");

        return Response.json(
            {
                success: false,
                message: "Failed to update the user status to accept messages"
            },
            {
                status: 500
            }
        )
    }
}

export async function GET() {
    await dbConnect()
    const session = await auth()

    if (!session || !session?.user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated"
            },
            {
                status: 401
            }
        )
    }
    
    const user = session?.user

    
    
    try {
        
        const userId = user?._id
        const foundUser = await UserModel.findById(userId)

        if(!foundUser){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 401
                }
            )
        }

        return Response.json(
            {
                success: true,
                isAcceptingMessages:foundUser.isAcceptingMessages
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("Error in getting message acceptance status");
        return Response.json(
            {
                success: false,
                message: "Error in getting message acceptance status"
            },
            {
                status: 500
            }
        )
    }


}