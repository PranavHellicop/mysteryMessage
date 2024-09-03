import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function DELETE(req,{params}){
    await dbConnect()
    const session = await auth()
    const user = session?.user
console.log(user);

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
    console.log("params",params);
    
    const messageId = params.messageid
    console.log(messageId);
    


    const upatedUser = await UserModel.updateOne(
        {_id:user._id},
        {$pull:{messages: {_id:messageId}}}
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
            success: true,
            message: "Message deleted"
        },
        {
            status: 201
        }
    )
}