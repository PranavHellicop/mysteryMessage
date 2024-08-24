import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { auth } from "@/auth";

export async function GET(request){
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

    const userId = new mongoose.Types.ObjectId(user._id)

    try {

        // Aggregation Pipeline
        const user = await UserModel.aggregate([
            {$match : { id : userId}},
            {$unwind: '$messages'},
            {$sort: {'messages.createdAt:':-1}},
            {$group: {_id: "$_id", messages:{$push:'$messages'}}}
        ])
        // TODO:Console
        if(!user || user.length===0){
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
                message: user[0].messages //aggregation pipeline returns an array
            },
            {
                status: 200
            }
        )
        
    } catch (error) {
        console.log("An unexpected error occured",error);
        
        return Response.json(
            
            {
                success: false,
                message: "Not Authenticated"
            },
            {
                status: 500
            }
        )
    }
}