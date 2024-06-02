import { Button } from "@/components/ui/button"
import { H1 } from "@/components/ui/typography"
import Link from "next/link"

export default async function VerifyPage({
  params,
}: {
  params: { code: string }
}) {
  const id = params.code
  const decodedId = decodeURIComponent(id)
  console.log(decodedId)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: decodedId }),
    }
  )

  const data = await response.json()
  console.log(data)

  if (data.success) {
    return (
      <div className="text-center my-40 mx-4">
        <H1>User verified.</H1>
        <Button asChild className="my-4">
          <Link href="/?state=login">Click here to login</Link>
        </Button>
      </div>
    )
  } else {
    return (
      <div className="text-center my-40 mx-4">
        <H1>Could not verify the user.</H1>
      </div>
    )
  }
}
