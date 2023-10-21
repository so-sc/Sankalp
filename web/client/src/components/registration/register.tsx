"use client"

import RegistrationDisplay from "@/components/registration-display"
import EventRegistration from "@/components/registration/event-registration"
import UserRegistration from "@/components/registration/user-registration"
import { H1 } from "@/components/ui/typography"
import { Step, UserProfile } from "@/lib/types"
import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"

export interface CommonRegistrationProps {
  setRegistrationData: Dispatch<SetStateAction<UserProfile>>
  setStep?: Dispatch<SetStateAction<Step>>
}

export default function Register() {
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
    <>
      {step === 1 && (
        <H1 className="lg:text-9xl text-center mb-8 text-3xl font-bold tracking-tighter sm:text-5xl  bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">DevHost 2023</H1>
      )}

      <div className="w-3/4 mx-auto">
        {step === 1 ? (
          <UserRegistration
            setRegistrationData={setRegistrationData}
            setStep={setStep}
          />
        ) : step === 2 ? (
          <EventRegistration
            setRegistrationData={setRegistrationData}
            registrationData={registrationData}
            setStep={setStep}
          />
        ) : (
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
                className="underline underline-offset-2"
              >
                Log in
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  )
}
