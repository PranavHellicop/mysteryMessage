import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request){
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryparam = {
            username: searchParams.get("username")
        }
        const result  = UsernameQuerySchema.safeParse(queryparam)
        

        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
     
            
            return Response.json({
                success:false,
                message:usernameErrors?.length>0 ? usernameErrors.join(", "):"Invalid query paramenters"
            },
            {
                status:400
            }
        )
        }
        // CHECK UNIQUENESS OF USERNAME
        const verifiedUserExist = await UserModel.findOne({
            username:result.data.username,
            isVerified:true
        })

        if(verifiedUserExist){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },
            {
                status:400
            })
        }

        return Response.json({
            success:true,
            message:"Username is unique"
        },
        {
            status:201
        })

    } catch (error) {
        console.log("Error checking username",error)
        return Response.json(
            {
            success:false,
            message:"Error checking username"
            },
            {
                status:500
            }
    )
    }
}