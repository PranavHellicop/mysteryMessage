import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function DELETE(request,params){
    await dbConnect()
    const session = await auth()
    const user = session?.user

    if (!session || !user) {
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

    const messageId = params.messageid


    const upatedUser = await UserModel.updateOne(
        {id:user._id},
        {$pull:{messages:messageId}}
    )

    if(upatedUser.modifiedCount===0){
        return Response.json(
            {
                success: false,
                message: "Failed to delete the message or message doesn't exist"
            },
            {
                status: 501
            }
        )
    }
    return Response.json(
        {
            success: success,
            message: "Message deleted"
        },
        {
            status: 201
        }
    )
}