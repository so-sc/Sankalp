import {
  loginSchema,
  memberSchema,
  registrationSchema,
  teamSchema,
} from "@/lib/schemas"
import { z } from "zod"

export type SearchParams = { [key: string]: string | string[] | undefined }
export type FormState = "login" | "register"

export type UserProfile = z.infer<typeof registrationSchema>
export type HackathonTeam = z.infer<typeof teamSchema>
export type User = UserProfile["user"]
export type Event = UserProfile["event"]
export type LoginUser = z.infer<typeof loginSchema>
export type Member = z.infer<typeof memberSchema>
export type Step = 1 | 2 | 3

export type SignUp = {
  name: string
  email: string
  gender: number
  student: boolean
  PhNo: string
  // Employee
  company?: string
  designation?: string
  // Student
  college?: string
  branch?: string
  course?: string
  year?: number
}

export type SignIn = {
  email: string
  id: string
}
