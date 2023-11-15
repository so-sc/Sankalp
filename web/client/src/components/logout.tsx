"use client"

import { Button } from "@/components/ui/button"
import { deleteCookie } from "cookies-next"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Logout() {
  const router = useRouter()
  function logout() {
    deleteCookie("token")
    router.push("/?state=login")
  }

  return (
    <Button
      variant="outline"
      className="flex gap-1 items-center"
      onClick={logout}
    >
      Logout <LogOut className="scale-75" />
    </Button>
  )
}
