import {
  adminLoginSchema,
  adminRegisterSchema,
  eventSchema,
  leaderSchema,
  loginSchema,
  memberSchema,
  otpSchema,
  registrationSchema,
  teamSchema,
} from "@/lib/schemas"
import { z } from "zod"

// Utility Types
type AddNewProperty<T, K extends string, V> = T & { [P in K]: V }

export type SearchParams = { [key: string]: string | string[] | undefined }
export type FormState = "login" | "register"

export type UserProfile = z.infer<typeof registrationSchema>
export type HackathonTeam = z.infer<typeof teamSchema>
export type User = UserProfile["user"]
export type Event = UserProfile["event"] // This is supposed to be talks but ik it is messed up a little
export type EventForm = z.infer<typeof eventSchema>
export type LoginUser = z.infer<typeof loginSchema>
export type Member = z.infer<typeof memberSchema>
export type Leader = z.infer<typeof leaderSchema>
export type Step = 1 | 2 | 3

// Admin Types
export type AdminRegister = z.infer<typeof adminRegisterSchema>
export type AdminLogin = z.infer<typeof adminLoginSchema>
export type OTPType = z.infer<typeof otpSchema>
export type AdminLoginStatus = "login" | "verify"
// ------------------

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

export type HackathonMemberAPI = {
  info: string
}

export type HackathonRegistration = {
  name: string
  theme: number
  themeDesc: string
  member: HackathonMemberAPI[]
}

export interface UserApiResponse {
  success: boolean
  data: Data
}

export type UserDashboardProfile = UserApiResponse["data"]

export interface Data {
  name: string
  email: string
  gender: number
  verify: boolean
  PhNo: string
  college?: string
  branch?: string
  course?: string
  year?: number
  company?: string
  designation?: string
  hacks?: Hacks
  talks?: Talks
  events?: EventElement[]
}

export interface EventElement {
  verify: boolean
  qrId: string
  event: EventEvent
}

export interface EventEvent {
  eve: number
  participant: AddNewProperty<Member, "name", string>[]
}

export interface Hacks {
  name: string
  theme: number
  themeDesc: string
  verify: boolean
  member: AddNewProperty<Member, "name", string>[]
}

export interface Talks {
  talk: Talk[]
  verify: boolean
  createdAt: Date
  updatedAt: Date
  qrId: string
}

export interface Talk {
  id: number
  verify: boolean
}

export interface HackathonAPIResponse {
  success: boolean
  data: HackathonData
}

export type HackathonDashboard = HackathonAPIResponse["data"]

export interface HackathonData {
  name: string
  theme: string
  themeDesc: string
  verify: boolean
  leader: AddNewProperty<Leader, "college", string>
  members: AddNewProperty<Leader, "college", string>[] // Schema will be Same as leader only
}

export interface EventRegistrationData {
  isEvent: boolean
  event: {
    eve: number // This will be the event number mentioned ./constants.ts
    participant: HackathonMemberAPI[]
  }
}
