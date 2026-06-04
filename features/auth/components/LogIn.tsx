'use client'
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginWithEmailAndPassword } from "../actions/login";

export default function Login() {
  const [statusText, setStatusText] = useState('')
  const router = useRouter();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values: LoginForm = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }
    const result = await LoginWithEmailAndPassword(values);
    setStatusText(result.message)
    if (result.success) {
      router.push('/dashboard');
    }

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="email" />
        <input type="text" name="password" placeholder="password" />
        <button type="submit">Hello</button>
      </form>
      {statusText && statusText}
    </div>
  )
}
