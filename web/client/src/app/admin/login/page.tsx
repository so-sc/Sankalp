"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { H1 } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import { adminLoginSchema } from "@/lib/schemas"
import {
  AdminLogin,
  AdminLoginStatus
} from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { CookieValueTypes, getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { FormEvent, useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { TbCaretLeftFilled, TbLoader2 } from "react-icons/tb"

export default function AdminRegistration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<any>(null)
  const [currentState, setCurrentState] = useState<AdminLoginStatus>("login")

  const { toast } = useToast()
  const router = useRouter()

  const loginForm = useForm<AdminLogin>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      id: "",
    },
  })

  const isTokenValid = useCallback(
    async (token: CookieValueTypes) => {
      const isTokenValidRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token-checker`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const result = await isTokenValidRes.json()

      if (result.success) {
        router.push("/admin/stats/count")
      }
    },
    [router]
  )

  useEffect(() => {
    const token = getCookie("admin-token", {
      path: "/admin",
    })
    isTokenValid(token)
  }, [isTokenValid])

  async function onLogin(values: AdminLogin) {
    try {
      setIsLoading(true)
      setError("")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      )
      const data = await response.json()
      if (data.success) {
        setData(data)
        toast({
          title: "OTP has been sent to registered email ID",
          variant: "success",
        })
        setCurrentState("verify")
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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

    if (otp === data?.otp) {
      toast({
        title: "OTP verified Successfully",
        variant: "success",
      })
      setCookie("admin-token", data.token, {
        path: "/admin",
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
      })
      router.push("/admin/stats/count")
    } else {
      setError("OTP did not match try again")
    }
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
        ) : currentState === "verify" ? (
          <form onSubmit={verifyOtp} className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-fit flex gap-2 items-center mb-4"
              onClick={() => setCurrentState("login")}
            >
              <TbCaretLeftFilled /> Back
            </Button>
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
        ) : (
          <>
            <p>You are not supposed to be here</p>
            <Button onClick={() => setCurrentState("login")}>Go back</Button>
          </>
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
