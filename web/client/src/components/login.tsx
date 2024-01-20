"use client"

import LoginForm from "@/components/forms/login-form"
import { H1 } from "@/components/ui/typography"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import { loginSchema } from "@/lib/schemas"
import { LoginUser, SignIn } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface LoginProps {
  isVerify?: boolean
}

export default function Login({ isVerify }: LoginProps) {
  const router = useRouter()
  const [error, setError] = useState("")
  const [userIsVerified, setUserIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = getCookie("token")
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  const form = useForm<LoginUser>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function verifyUser() {
    const token = getCookie("token")
    try {
      setIsLoading(true)
      setUserIsVerified(false)
      setError("")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await response.json()
      return data.success
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function onLogin(values: LoginUser) {
    const signInData: SignIn = {
      email: values.email,
      id: values.password,
    }

    try {
      setIsLoading(true)
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

      if (data.success) {
        setCookie("token", data.token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        })
        if (isVerify) {
          const userVerification = await verifyUser()
          if (userVerification) {
            setUserIsVerified(true)
            setTimeout(() => {
              router.push("/dashboard")
            }, 2000)
          } else {
            setError("Verification Failed")
          }
        } else {
          router.push("/dashboard")
        }
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.log(error)
      deleteCookie("token")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="mb-10">
        {isVerify && (
          <H1 className="lg:text-8xl md:text-6xl text-5xl text-center">
            {MAIN_EVENT_NAME}
          </H1>
        )}
        <p className="text-center mt-5 text-lg md:text-2xl font-bold">
          {isVerify ? "Verify User" : "Login to Dashboard"}
        </p>
      </div>

      <LoginForm
        form={form}
        onLogin={onLogin}
        isLoading={isLoading}
        error={error}
      >
        {userIsVerified && (
          <div className="text-center mt-4">
            <p className="text-green-500">Verified Succesfully!</p>
            <p>
              Go to{" "}
              <Link href="/dashboard" className="underline">
                Dashboard
              </Link>
            </p>
          </div>
        )}
        {!isVerify && (
          <div>
            <p className="text-center mt-4">
              Yet to register?{" "}
              <Link
                href={`?${new URLSearchParams({ state: "register" })}`}
                className="underline underline-offset-2 hover:underline-offset-4"
              >
                Register Here
              </Link>
            </p>
          </div>
        )}
      </LoginForm>
    </>
  )
}
