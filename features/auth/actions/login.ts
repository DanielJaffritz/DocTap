'use server'
import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { APIError, isAPIError } from "better-auth/api"

export async function LoginWithEmailAndPassword(values: LoginForm) {
  try {
    const res = await auth.api.signInEmail({
      body: {
        email: values.email,
        password: values.password
      },
    })
    return { success: true, message: "success" }
  } catch (error) {
    if (isAPIError(error)) {
      return { success: false, message: error.message }
    }
    return { success: false, message: "An unexpected error ocurred" }
  }
}

