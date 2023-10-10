import Login from "@/components/login"
import Register from "@/components/register"
import Link from "next/link"

export type SearchParams = { [key: string]: string | string[] | undefined }
export type FormState = "login" | "register"
interface HomePageProps {
  searchParams: SearchParams
}

export default function HomePage({ searchParams }: HomePageProps) {
  const state = (searchParams.state as FormState) || "register"
  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-12">
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
