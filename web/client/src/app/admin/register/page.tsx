"use client"

import LoginForm from "@/components/forms/login-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { H1 } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import { ADMIN_ROLES, MAIN_EVENT_NAME } from "@/lib/constants"
import { adminRegisterSchema } from "@/lib/schemas"
import { AdminRegister } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCookie } from "cookies-next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TbLoader2 } from "react-icons/tb"

export default function AdminRegistration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { toast } = useToast()

  const form = useForm<AdminRegister>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      role: "Administrator",
    },
  })

  async function onRegister(values: AdminRegister) {
    console.log(values)
    const finalValues = {
      username: values.username,
      email: values.email,
      role: ADMIN_ROLES.indexOf(values.role) + 1,
    }

    try {
      setIsLoading(true)
      setError("")
      const token = getCookie("token")
      console.log(finalValues)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(finalValues),
        }
      )
      const data = await response.json()
      console.log(data)
      if (data.success) {
        toast({
          title: "Admin Registered Successfully",
          variant: "success",
        })
        redirect("/admin/login")
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="my-16">
      <div className="mb-10">
        <H1 className="lg:text-8xl md:text-6xl text-5xl text-center">
          {MAIN_EVENT_NAME} Admin
        </H1>
        <p className="text-center mt-5 text-lg md:text-2xl font-bold">
          Register for Admin Panel
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onRegister)}
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Username" {...field} />
                  </FormControl>
                  {form.formState.errors.username?.message && (
                    <p className="text-red-500">
                      {form.formState.errors.username?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ADMIN_ROLES.map((role) => (
                          <SelectItem value={role} key={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {form.formState.errors.role?.message && (
                    <p className="text-red-500">
                      {form.formState.errors.role?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <Button
              type="submit"
              className="mt-4 flex items-center gap-2"
              disabled={isLoading}
            >
              Register
              {isLoading && <TbLoader2 className="animate-spin" />}
            </Button>
          </form>
        </Form>
        <div>
          <p className="text-center mt-4">
            Already admin? Show it,{" "}
            <Link
              href="/admin/login"
              className="underline underline-offset-2 hover:underline-offset-4"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
