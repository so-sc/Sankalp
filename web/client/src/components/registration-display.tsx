import { Button } from "@/components/ui/button"
import Notification from "@/components/ui/notification"
import { H1 } from "@/components/ui/typography"
import UserDisplay from "@/components/user-display"
import { ESPORTS, TALKS } from "@/lib/constants"
import { Step, UserProfile } from "@/lib/types"
import { Dispatch, SetStateAction } from "react"
import { TbCaretLeftFilled } from "react-icons/tb"

interface RegistrationDisplayProps {
  registrationData: UserProfile
  setStep: Dispatch<SetStateAction<Step>>
}

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
        <div className="flex flex-col gap-4 mt-4">
          <UserDisplay user={user} />
          <div>
            <p className="text-center mb-2 bg-foreground/10 px-2 py-2">
              Talks you have opted in
            </p>
            <div className="">
              {event.talks.map(
                (item: boolean, index: number) =>
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
                (item: boolean, index: number) =>
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
