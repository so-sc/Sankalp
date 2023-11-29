"use client"

import LoginForm from "@/components/forms/login-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { H1 } from "@/components/ui/typography"
import { ADMIN_ROLES, MAIN_EVENT_NAME } from "@/lib/constants"
import { adminLoginSchema, adminRegisterSchema, otpSchema } from "@/lib/schemas"
import {
  AdminLogin,
  AdminLoginStatus,
  AdminRegister,
  OTPType,
} from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { TbLoader2 } from "react-icons/tb"

export default function AdminRegistration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentState, setCurrentState] = useState<AdminLoginStatus>("login")

  const loginForm = useForm<AdminLogin>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      id: "",
    },
  })

  function onLogin(values: AdminLogin) {
    console.log(values)
    setCurrentState("verify")
  }

  function verifyOtp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    const formData = new FormData(e.currentTarget)
    const otp = formData.get("otp")

    if (otp?.length !== 6) {
      setError("Please enter valid OTP")
      return
    }

    console.log(otp)
  }

  return (
    <main className="my-16">
      <div className="mb-10">
        <H1 className="lg:text-8xl md:text-6xl text-5xl text-center">
          {MAIN_EVENT_NAME} Admin
        </H1>
        <p className="text-center mt-5 text-lg md:text-2xl font-bold">
          Login to Admin Panel
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        {currentState === "login" ? (
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onLogin)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
                    </FormControl>
                    {loginForm.formState.errors.username?.message && (
                      <p className="text-red-500">
                        {loginForm.formState.errors.username?.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Authorization ID"
                        {...field}
                      />
                    </FormControl>
                    {loginForm.formState.errors.id?.message && (
                      <p className="text-red-500">
                        {loginForm.formState.errors.id?.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-4 flex items-center gap-2"
                disabled={isLoading}
              >
                Proceed
                {isLoading && <TbLoader2 className="animate-spin" />}
              </Button>
            </form>
          </Form>
        ) : (
          <form onSubmit={verifyOtp} className="flex flex-col gap-2">
            <Input type="password" placeholder="OTP" name="otp" />
            <Button
              type="submit"
              className="mt-4 flex items-center gap-2"
              disabled={isLoading}
            >
              Verify OTP
              {isLoading && <TbLoader2 className="animate-spin" />}
            </Button>
          </form>
        )}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <div>
          <p className="text-center mt-4">
            Not an admin? So sad... Contact Deveesh or Akkil to get permissions{" "}
          </p>
        </div>
      </div>
    </main>
  )
}
