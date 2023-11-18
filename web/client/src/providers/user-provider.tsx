"use client"

import { UserDashboardProfile } from "@/lib/types"
import { CookieValueTypes, getCookie } from "cookies-next"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

interface UserProviderProps {
  children: React.ReactNode
}

interface UserContextProps {
  user: UserDashboardProfile | null
  setUser: Dispatch<SetStateAction<UserDashboardProfile | null>>
}

const userContext = createContext<UserContextProps | null>(null)

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserDashboardProfile | null>(null)

  async function getUser(access_token: CookieValueTypes) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/app/info/u`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          cache: "no-store",
        }
      )
      const data = await response.json()

      if (data.success) {
        setUser(data.data)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.log(error)
      setUser(null)
    }
  }

  useEffect(() => {
    const token = getCookie("token")
    getUser(token)
  }, [])

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
}

export function useUser() {
  const context = useContext(userContext)

  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }

  return context
}
