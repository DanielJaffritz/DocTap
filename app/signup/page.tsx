import Decorator from "@/features/auth/components/Decorator";
import SignUp from "@/features/auth/components/SignUp";

export default function SignUpPage() {
  return (
    <div className="w-screen h-screen flex flex-row">
      <Decorator />
      <SignUp />
    </div>
  )
}
