import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter"
import { prisma } from "./prisma";
import EmailTemplate from "@/components/emailTemplate";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./resend";
import "dotenv/config"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.BASE_URL as string],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }, request) => {
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Verify your email address",
        react: EmailTemplate({ firstName: user.name, verifyUrl: url }),
      })
    }
  },
  baseURL: process.env.BASE_URL as string,
  socialProviders: {
    google: {
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }
  },
  plugins: [nextCookies()],

})
