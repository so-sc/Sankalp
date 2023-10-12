import { teamSchema } from "@/components/hackathon-registration"
import { registrationSchema } from "@/components/register"
import { z } from "zod"

export type UserProfile = z.infer<typeof registrationSchema>
export type HackathonTeam = z.infer<typeof teamSchema>
