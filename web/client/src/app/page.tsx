import Login from "@/components/login"
import Register from "@/components/register"
import { H1 } from "@/components/ui/typography"
import Link from "next/link"

export type SearchParams = { [key: string]: string | string[] | undefined }
export type FormState = "login" | "register"
interface HomePageProps {
  searchParams: SearchParams
}

export default function HomePage({ searchParams }: HomePageProps) {
  const state = (searchParams.state as FormState) || "login"
  console.log(state)
  return (
    <main className="min-h-screen container mx-auto p-8 lg:p-20 xl:p-24">
      <H1 className="lg:text-9xl text-center mb-4 md:mb-8 lg:mb-12 xl:mb-16 ">
        DevHost 2023
      </H1>
      {state === "login" ? (
        <Login />
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
