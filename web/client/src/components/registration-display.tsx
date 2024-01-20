import { Button } from "@/components/ui/button"
import Notification from "@/components/ui/notification"
import { H1 } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import UserDisplay from "@/components/user-display"
import { MAIN_EVENT_NAME, genders } from "@/lib/constants"
import { SignUp, Step, UserProfile } from "@/lib/types"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { TbCaretLeftFilled, TbLoader2 } from "react-icons/tb"

interface RegistrationDisplayProps {
  registrationData: UserProfile
  setStep: Dispatch<SetStateAction<Step>>
}

export default function RegistrationDisplay({
  registrationData,
  setStep,
}: RegistrationDisplayProps) {
  const { toast } = useToast()

  const { user, event } = registrationData
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleRegistration() {
    setIsLoading(true)
    // Some helper variables

    const signUpData: SignUp = {
      name: registrationData.user.name,
      email: registrationData.user.email,
      gender:
        genders.findIndex((gender) => gender === registrationData.user.gender) +
        1, // Hate you Akkil for taking gender as number and using 1 indexing
      PhNo: registrationData.user.phone,
      student: registrationData.user.role.role === "student",
    }

    if (registrationData.user.role.role === "student") {
      signUpData.college = registrationData.user.role.college
      signUpData.course = registrationData.user.role.course
      signUpData.branch = registrationData.user.role.branch
      signUpData.year = Number(registrationData.user.role.yearOfStudy)

      // If it is employee
    } else if (registrationData.user.role.role === "employee") {
      signUpData.company = registrationData.user.role.company
      signUpData.designation = registrationData.user.role.designation
    }

    try {
      setError("")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        }
      )

      const data = await response.json()
      if (data.success) {
        toast({
          title: "Congratulation! Registration is successful",
          description: "Checkout the events and hackathon!",
          variant: "success",
        })
        router.push("/?state=login")
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <Button
        className="flex gap-2"
        variant="outline"
        onClick={() => setStep((prev: Step) => (prev - 1) as Step)}
      >
        <TbCaretLeftFilled /> Prev
      </Button>
      <H1 className="text-2xl lg:text-3xl text-center my-4">
        Confirm your registration to {MAIN_EVENT_NAME}
      </H1>
      <div>
        <div className="flex flex-col gap-4 mt-4">
          <UserDisplay user={user} />
          {/* <div>
            <p className="text-center mb-2 bg-foreground/10 px-2 py-2">
              Talks you have opted in
            </p>
            <div>
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
          </div> */}
        </div>
      </div>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <Notification variant="info" className="mt-2">
        <p>
          After clicking this button, a verification mail with a unique ID will
          be sent to your registered mail id. This unique Id will be your
          password to the dashboard. Double check your mail, and make sure to
          check your spam folder too!
        </p>
      </Notification>
      <Button
        className="mt-4 w-full flex items-center gap-2"
        disabled={isLoading}
        onClick={handleRegistration}
      >
        Register Now!
        {isLoading && <TbLoader2 className="animate-spin" />}
      </Button>
    </main>
  )
}
