import Decorator from "@/features/auth/components/Decorator";
import Login from "@/features/auth/components/LogIn";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex flex-row">
      <Decorator />
      <Login />
    </div>
  )
}
