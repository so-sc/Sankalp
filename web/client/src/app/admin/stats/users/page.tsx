import { isAdminLoggedIn } from "@/app/admin/stats/hackathon/page"
import { userColumns } from "@/components/tables/columns/user-columns"
import DataTable from "@/components/tables/data-table"
import { H1, H2 } from "@/components/ui/typography"
import { MAIN_EVENT_NAME } from "@/lib/constants"
import { userAdminResponse } from "@/lib/placeholder"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function HackathonTeamsPage() {
  await isAdminLoggedIn()
  // Get Hackathon teams using API

  return (
    <main className="container mx-auto px-8 lg:px-20 xl:px-24 py-10 md:py-24 flex flex-col justify-center">
      <div>
        <H1>Registered Users for {MAIN_EVENT_NAME}</H1>
        <H2 className="mt-2 font-normal">
          Total users: {userAdminResponse.length}
        </H2>
      </div>
      <DataTable
        columns={userColumns}
        data={userAdminResponse}
        purpose="user"
      />
    </main>
  )
}
