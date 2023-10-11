import { ESPORTS, TALKS } from "@/components/event-registration"
import { Step, formSchema } from "@/components/register"
import { Button } from "@/components/ui/button"
import Notification from "@/components/ui/notification"
import { H1 } from "@/components/ui/typography"
import { Dispatch, SetStateAction } from "react"
import { TbCaretLeftFilled } from "react-icons/tb"
import { z } from "zod"

interface RegistrationDisplayProps {
  registrationData: z.infer<typeof formSchema>
  setStep: Dispatch<SetStateAction<Step>>
}

export const numberDisplay = ["1st", "2nd", "3rd", "4th", "5th"]

export default function RegistrationDisplay({
  registrationData,
  setStep,
}: RegistrationDisplayProps) {
  const { user, event } = registrationData

  function handleRegistration() {
    console.log(registrationData)
  }

  return (
    <main>
      <Button
        className="flex gap-2"
        variant="outline"
        onClick={() => setStep(2)}
      >
        <TbCaretLeftFilled /> Prev
      </Button>
      <H1 className="text-3xl lg:text-4xl text-center my-4">
        Confirm Registration for DevHost 2023
      </H1>
      <div>
        <p className="text-center mb-2 bg-foreground/10 px-2 py-2">
          Attendee Details
        </p>
        <p className="py-1 border-b border-b-foreground/10">
          Name: <span className="font-bold">{user.name}</span>
        </p>
        <p className="py-1 border-b border-b-foreground/10">
          Email: <span className="font-bold">{user.email}</span>
        </p>
        <p className="py-1 border-b border-b-foreground/10">
          Gender:{" "}
          <span className="font-bold">
            {user.gender[0].toUpperCase() + user.gender.slice(1)}
          </span>
        </p>
        {user.role.role === "student" ? (
          <>
            <p className="py-1 border-b border-b-foreground/10">
              College: <span className="font-bold">{user.role.college}</span>
            </p>
            <p className="py-1 border-b border-b-foreground/10">
              Course: <span className="font-bold">{user.role.course}</span>
            </p>
            <p className="py-1 border-b border-b-foreground/10">
              Branch: <span className="font-bold">{user.role.branch}</span>
            </p>
            <p className="py-1">
              Year of Study:{" "}
              <span className="font-bold">
                {numberDisplay[Number(user.role.yearOfStudy) - 1]} year
              </span>
            </p>
          </>
        ) : user.role.role === "employee" ? (
          <>
            <p className="py-1 border-b border-b-foreground/10">
              Company: <span className="font-bold">{user.role.company}</span>
            </p>
            <p className="py-1">
              Designation:{" "}
              <span className="font-bold">{user.role.designation}</span>
            </p>
          </>
        ) : (
          <p className="text-center text-red-500">Please select a role</p>
        )}
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <p className="text-center mb-2 bg-foreground/10 px-2 py-2">
              Talks you have opted in
            </p>
            <div className="">
              {event.talks.map(
                (item, index) =>
                  item && (
                    <p
                      key={index}
                      className="py-2 border-b border-b-foreground/10 last-of-type:border-b-0"
                    >
                      {item ? TALKS[index] : ""}
                    </p>
                  )
              )}
            </div>
          </div>
          <div>
            <p className="text-center mb-2 bg-foreground/10 px-2 py-2">
              eSports you are attending
            </p>
            <div className="flex flex-col gap-1">
              {event.esports.map(
                (item, index) =>
                  item && (
                    <p
                      key={index}
                      className="py-2 border-b border-b-foreground/10 last-of-type:border-b-0"
                    >
                      {item ? ESPORTS[index] : ""}
                    </p>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification variant="info" className="mt-2">
        <p>
          Please double check your email. QR Code will be sent to you via mail,
          that will be your entry pass to the event.
        </p>
      </Notification>
      <Button className="w-full mt-8 md:mt-4" onClick={handleRegistration}>
        Confirm Registration
      </Button>
    </main>
  )
}
