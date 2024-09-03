import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import bcrypt from "bcryptjs"
 
// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "Email", type: "text", placeholder: "jsmith" },//TODO:
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await dbConnect()
             
                
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error('No User found with this email')
                        // return null
                    }
                    if (!user.isVerified) {
                        throw new Error('Please verify your account before logging in')
                        // return null

                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (isPasswordCorrect) {
                        return user
                    } else {
                         throw new WrongPassword("Password is wrong");
                        // return null


                    }
                } catch (error) {
                    
                    throw new Error(error)
                }
            }
        })
    ],
} 