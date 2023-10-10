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

const numberDisplay = ["1st", "2nd", "3rd", "4th", "5th"]

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
        onClick={() => setStep(1)}
      >
        <TbCaretLeftFilled /> Prev
      </Button>
      <H1 className="text-3xl lg:text-4xl text-center my-4">
        Confirm Registration for DevHost 2023
      </H1>
      <div>
        <p className="text-center text-lg mb-2 bg-foreground/10 py-2">
          Attendee Details
        </p>
        <p className="py-1 border-b border-b-foreground/10">
          Name: {user.name}
        </p>
        <p className="py-1 border-b border-b-foreground/10">
          Email: {user.email}
        </p>
        <p className="py-1 border-b border-b-foreground/10">
          Gender: {user.gender[0].toUpperCase() + user.gender.slice(1)}
        </p>
        {user.role.role === "student" ? (
          <>
            <p className="py-1 border-b border-b-foreground/10">
              College: {user.role.college}
            </p>
            <p className="py-1 border-b border-b-foreground/10">
              Course: {user.role.course}
            </p>
            <p className="py-1 border-b border-b-foreground/10">
              Branch: {user.role.branch}
            </p>
            <p className="py-1">
              Year of Study: {numberDisplay[Number(user.role.yearOfStudy) - 1]}{" "}
              year
            </p>
          </>
        ) : user.role.role === "employee" ? (
          <>
            <p className="py-1 border-b border-b-foreground/10">
              Company: {user.role.company}
            </p>
            <p className="py-1">Designation: {user.role.designation}</p>
          </>
        ) : (
          <p className="text-center text-red-500">Please select a role</p>
        )}
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <p className="text-center text-lg mb-2 bg-foreground/10 py-2">
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
            <p className="text-center text-lg mb-2 bg-foreground/10 py-2">
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
      <Notification variant="info" className="mt-4">
        <p>
          Please double check your email. Registration QR Code will be sent to
          you via mail, that will be your entry pass to the event.
        </p>
      </Notification>
      <Button className="w-full mt-4" onClick={handleRegistration}>
        Confirm Registration
      </Button>
    </main>
  )
}
