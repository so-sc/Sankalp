"use client"

import RegistrationDisplay from "@/components/registration-display"
import TalksRegistration from "@/components/registration/talks-registration"
import UserRegistration from "@/components/registration/user-registration"
import { H1 } from "@/components/ui/typography"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import { Step, UserProfile } from "@/lib/types"
import { getCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export interface CommonRegistrationProps {
  setRegistrationData: Dispatch<SetStateAction<UserProfile>>
  setStep?: Dispatch<SetStateAction<Step>>
}

export default function Register() {
  const router = useRouter()
  useEffect(() => {
    const token = getCookie("token")
    if (token) {
      router.push("/dashboard")
    }
  })

  const [registrationData, setRegistrationData] = useState<UserProfile>({
    user: {
      name: "",
      email: "",
      phone: "",
      gender: "male",
      role: {
        role: "student",
        college: "",
        course: "",
        branch: "",
        yearOfStudy: "1",
      },
    },
    event: {
      talks: [false, false, false, false, false, false],
      esports: [false, false],
    },
  })

  const [step, setStep] = useState<Step>(1)

  return (
    <div className="py-20">
      {step === 1 && (
        <div className="mb-8">
          <H1 className="lg:text-8xl md:text-6xl text-5xl text-center">
            {MAIN_EVENT_NAME}
          </H1>
          <p className="text-center mt-5 text-lg md:text-2xl font-bold">
            Register for {MAIN_EVENT_NAME}
          </p>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        {step === 1 ? (
          <UserRegistration
            setRegistrationData={setRegistrationData}
            setStep={setStep}
          />
        ) : (
          // ) : step === 2 ? (
          //   <TalksRegistration
          //     setRegistrationData={setRegistrationData}
          //     registrationData={registrationData}
          //     setStep={setStep}
          //   />
          <RegistrationDisplay
            registrationData={registrationData}
            setStep={setStep}
          />
        )}

        {step === 1 && (
          <div>
            <p className="text-center mt-4">
              Already registered?{" "}
              <Link
                href={`?${new URLSearchParams({ state: "login" })}`}
                className="underline underline-offset-2 hover:underline-offset-4"
              >
                Log in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
