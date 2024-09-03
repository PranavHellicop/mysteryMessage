import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { auth } from "@/auth";
import mongoose from "mongoose";

export async function GET(request){
    await dbConnect()
    // console.log("request",request);
    
    const searchParams = new URL(request.url).searchParams
    
    const PER_PAGE = searchParams.get("per_page") ?? 5
    const PAGE = searchParams.get("page") ?? 1

    console.log("PAGE",PAGE);

    
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

    const userId = new mongoose.Types.ObjectId(`${user._id}`)

    
    try {

        // Aggregation Pipeline
        const user = await UserModel.aggregate([
            {$match : { _id : userId}},
            {$unwind: '$messages'},
            {$sort: {'messages.createdAt:':-1}},
            {$skip:parseInt(PER_PAGE)*(parseInt(PAGE)-1)},
            {$limit:parseInt(PER_PAGE)},
            {$group: {_id: "$_id", messages:{$push:'$messages'}}},
        ])
        console.log(user);
        
        // TODO:Console
      

       
        
        if(!user){
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
        if(user.length===0){
            return Response.json(
                {
                    success: false,
                    message: "No Messages Found"
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