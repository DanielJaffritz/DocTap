'use client'
import { FormEvent, useState } from "react";
import { signUpWithEmailAndPassword } from "../actions/signup";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [statusText, setStatusText] = useState('')
  const router = useRouter();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: SignUpForm = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }
    const result = await signUpWithEmailAndPassword(values);
    setStatusText(result.message)
    if (result.success) {
      router.push('/dashboard');
    }

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="username" />
        <input type="text" name="email" placeholder="email" />
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Hello</button>
      </form>
      {statusText && statusText}
    </div>
  )
}
