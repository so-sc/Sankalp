import { ESPORTS, TALKS } from "@/components/event-registration"
import { Step, formSchema } from "@/components/register"
import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import { Dispatch, SetStateAction } from "react"
import { TbCaretLeftFilled } from "react-icons/tb"
import { z } from "zod"

interface RegistrationDisplayProps {
  registrationData: z.infer<typeof formSchema>
  setStep: Dispatch<SetStateAction<Step>>
}

export default function RegistrationDisplay({
  registrationData,
  setStep,
}: RegistrationDisplayProps) {
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
        <p className="text-center text-lg mb-2">Attendee Details</p>
        <p>Name: {registrationData.user.name}</p>
        <p>Email: {registrationData.user.email}</p>
        <p>
          Gender:{" "}
          {registrationData.user.gender[0].toUpperCase() +
            registrationData.user.gender.slice(1)}
        </p>
        <p>Registering as a {registrationData.user.role.role}</p>
        {registrationData.user.role.role === "student" ? (
          <>
            <p>College: {registrationData.user.role.college}</p>
            <p>Course: {registrationData.user.role.course}</p>
            <p>Branch: {registrationData.user.role.branch}</p>
            <p>Year of Study: {registrationData.user.role.yearOfStudy}</p>
          </>
        ) : registrationData.user.role.role === "employee" ? (
          <>
            <p>Company: {registrationData.user.role.company}</p>
            <p>Designation: {registrationData.user.role.designation}</p>
          </>
        ) : (
          <p>Please select a role</p>
        )}
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <p className="text-center text-lg mb-2">Talks you have opted in</p>
            {registrationData.event.talks.map((item, index) => (
              <p key={index}>{item ? TALKS[index] : ""}</p>
            ))}
          </div>
          <div>
            <p className="text-center text-lg mb-2">
              eSports you have opted in
            </p>
            {registrationData.event.esports.map((item, index) => (
              <p key={index}>{item ? ESPORTS[index] : ""}</p>
            ))}
          </div>
        </div>
      </div>
      <Button className="w-full mt-2" onClick={handleRegistration}>
        Confirm Registration
      </Button>
    </main>
  )
}
