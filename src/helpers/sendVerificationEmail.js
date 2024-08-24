import { resend } from "@/lib/resend";
import { VerificationEmail } from "@/emailtemplate/verificatonEmail";

export async function sendVerificationEmail(
    email,
    username,
    verifyCode
){
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystery Message | Verification Code',
            react: VerificationEmail({ otp:verifyCode,username }),
          });
        return {success:true,message:"Verification email sent successfully"}

    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return{success:false,message:'Failed to send verification email'}
    }
}