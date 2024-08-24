"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function credentialLogin(data) {
  const formData = Object.fromEntries(data)

  try {
    const result = await signIn("credentials", {
      identifier: formData.identifier,
      password: formData.password,
      redirect: false
    })

    return result
  } catch (error) {
    
    throw new Error(error);
  }

}

