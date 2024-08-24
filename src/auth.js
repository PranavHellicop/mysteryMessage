import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import bcrypt from "bcryptjs"
import { CredentialsSignin } from "next-auth"

// class WrongPassword extends CredentialsSignin {
//     code = "Wrong_Password";
//   }


export const { handlers, signIn, signOut, auth } = NextAuth({
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
                console.log(credentials);
                
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
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user.id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
            }

            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessages = token.isAcceptingMessages
                session.user.username = token.username
            }
            return session
        }
    },

    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"

    },
    
    secret:process.env.AUTH_SECRET,

})