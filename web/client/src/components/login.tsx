"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { H2 } from "@/components/ui/typography"
import { loginSchema } from "@/lib/schemas"
import { LoginUser, SignIn } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { setCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TbLoader2 } from "react-icons/tb"

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState("")

  const form = useForm<LoginUser>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onLogin(values: LoginUser) {
    const signInData: SignIn = {
      email: values.email,
      id: values.password,
    }

    try {
      setError("")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInData),
        }
      )
      const data = await response.json()
      console.log(data)

      if (data.success) {
        setCookie("token", data.token, {
          secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
        })
        router.push("/dashboard")
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-3/4 mx-auto">
      <H2 className="text-center mb-4">Login to Dashboard</H2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onLogin)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                {form.formState.errors.email?.message && (
                  <p className="text-red-500">
                    {form.formState.errors.email?.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password (Registration ID which you got in mail)"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.password?.message && (
                  <p className="text-red-500">
                    {form.formState.errors.password?.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 flex items-center gap-2"
            disabled={form.formState.isLoading}
          >
            Login
            {form.formState.isLoading && <TbLoader2 className="animate-spin" />}
          </Button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </Form>
      <div>
        <p className="text-center mt-4">
          Yet to Register?{" "}
          <Link
            href={`?${new URLSearchParams({ state: "register" })}`}
            className="underline underline-offset-2"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  )
}
