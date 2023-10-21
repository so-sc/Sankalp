import {
  MAX_MEMBERS,
  MIN_MEMBERS,
  THEMES,
  TOTAL_ESPORTS,
  TOTAL_TALKS,
} from "@/lib/constants"
import { z } from "zod"

export const eventSchema = z.object({
  talks: z
    .boolean()
    .array()
    .length(TOTAL_TALKS)
    .default(Array(TOTAL_TALKS).fill(false)),
  esports: z
    .boolean()
    .array()
    .length(TOTAL_ESPORTS)
    .default(Array(TOTAL_ESPORTS).fill(false)),
})

export const studentSchema = z.object({
  role: z.literal("student"),
  college: z.string().min(3),
  course: z.string().min(2),
  yearOfStudy: z.enum(["1", "2", "3", "4", "5"]),
  branch: z.string().min(2),
})

export const employeeSchema = z.object({
  role: z.literal("employee"),
  company: z.string().min(3),
  designation: z.string().min(2),
})

export const userSchema = z.object({
  name: z.string().min(3).max(48),
  email: z.string().email(),
  phone: z.string().length(10),
  gender: z.enum(["male", "female", "non-binary", "other"]),
  role: z.union([studentSchema, employeeSchema]),
})

export const registrationSchema = z.object({
  user: userSchema,
  event: eventSchema,
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(24),
})

export const memberSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  phone: z.string().length(10),
  year: z.enum(["1", "2", "3", "4", "5"]),
})

export const teamSchema = z.object({
  teamName: z.string().min(3).max(50),
  totalMembers: z.number().min(MIN_MEMBERS).max(MAX_MEMBERS), // Including the leader
  teamTheme: z.enum(THEMES),
  teamStatement: z.string().min(25).max(250),
  teamCollege: z.string().min(3).max(50),
  leader: memberSchema, // Same schema but in the name of leader
  // Minimum 1 member and maximum 3 members excluding the leader
  members: z
    .array(memberSchema)
    .min(MIN_MEMBERS - 1)
    .max(MAX_MEMBERS - 1),
})
