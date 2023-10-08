"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { H2 } from "@/components/ui/typography"
import Link from "next/link"
import { FormEvent } from "react"

export default function Register() {
  async function onRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const details = {
      email: formData.get("email"),
      password: formData.get("password"),
    }
    console.log(details)
  }

  return (
    <div className="w-3/4 mx-auto">
      <H2 className="text-center mb-4">Register to DevHost</H2>
      <form onSubmit={onRegister}>
        <div className="flex flex-col gap-2">
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <Button type="submit" className="mt-4">
            Log in
          </Button>
        </div>
        <p className="text-center mt-4">
          Already registered?{" "}
          <Link
            href={`?${new URLSearchParams({ state: "login" })}`}
            className="underline underline-offset-2"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}
