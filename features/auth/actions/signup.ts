'use server'
import { auth } from "@/lib/auth"
import { APIError, isAPIError } from "better-auth/api"

export async function signUpWithEmailAndPassword(values: SignUpForm) {
  try {
    const res = await auth.api.signUpEmail({
      body: {
        name: values.name,
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
