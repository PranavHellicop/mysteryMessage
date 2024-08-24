import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request) {

    await dbConnect()
    try {

        const { username, code } = await request.json()

        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({
            username: decodedUsername
        })
        if (!user) {

            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 500
                }
            )
        }
        const isCodeValid = code === user.verifyCode
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if (isCodeValid && isCodeNotExpired) {
            user.isVerified = true
            await user.save()

            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully"
                },
                {
                    status: 201
                }
            )
        } else if (!isCodeNotExpired) {

            return Response.json(
                {
                    success: false,
                    message: "Verification code has expired. Please signup again to receive a new code"
                },
                {
                    status: 400
                }
            )
        } else {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect Verification Code"
                },
                {
                    status: 400
                }
            )
        }



    } catch (error) {
        console.log("Error in verifying code", error)
        return Response.json(
            {
                success: false,
                message: "Error in verifying code"
            },
            {
                status: 500
            }
        )
    }

}