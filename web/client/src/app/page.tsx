import Login from "@/components/login"
import Register from "@/components/registration/register"
import { H1 } from "@/components/ui/typography"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import { FormState, SearchParams } from "@/lib/types"
import Link from "next/link"

interface HomePageProps {
  searchParams: SearchParams
}

async function fetchServerStatus() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await response.json()
  } catch (error) {
    console.log(error)
    return { serverStatus: { success: false } }
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const state = (searchParams.state as FormState) || "login"
  const serverStatus = await fetchServerStatus()

  if (!serverStatus.success) {
    return (
      <main>
        <div className="text-center my-16">
          <H1 className="my-4">We are currently under maintainance!</H1>
          <p className="text-2xl">
            Please try again later, you can contact us at sosc@sahyadri.edu.in
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-12">
      {state === "login" ? (
        <div className="md:pb-10 md:pt-5 py-20">
          <H1 className="lg:text-8xl md:text-6xl text-5xl text-center">
            {MAIN_EVENT_NAME}
          </H1>
          <Login />
        </div>
      ) : state === "register" ? (
        <Register />
      ) : (
        <div className="text-center ">
          <p className="text-2xl">Haha! Caught you manipulating the URL</p>
          <p className="mt-2">
            <Link
              href={`?${new URLSearchParams({ state: "register" })}`}
              className="underline underline-offset-2"
            >
              Click here
            </Link>{" "}
            to go back to registering.
          </p>
        </div>
      )}
    </main>
  )
}
