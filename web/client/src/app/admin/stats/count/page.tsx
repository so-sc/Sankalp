import { H1 } from "@/components/ui/typography"
import { EVENTS_DETAILS, THEMES, genders, numberDisplay } from "@/lib/constants"
import { capitalize } from "@/lib/utils"
import { cookies } from "next/headers"

async function getRegistrationCount() {
  const cookieObj = cookies()
  const adminToken = cookieObj.get("admin-token")?.value
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/statistics/count`,
    // "https://sankalp-api.sosc.org.in/api/admin/statistics/count",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      next: {
        revalidate: 60,
      },
    }
  )
  const data = await res.json()
  return data
}

export default async function RegistrationsCount() {
  const usersCount = await getRegistrationCount()
  return (
    <main className="text-center my-40 mx-4">
      <H1 className="mb-4">Registration Data</H1>
      <div>
        <p>Total Users Registered: {usersCount.users}</p>
      </div>
      {/* <div>
        <p>Male: {usersCount.gender[0].count}</p>
        <p>Female: {usersCount.gender[1].count}</p>
        {usersCount.gender[2] && <p>{usersCount.gender[2].count}</p>}
        {usersCount.gender[3] && <p>{usersCount.gender[3].count}</p>}
      </div> */}

      <div>
        {usersCount.gender
          .sort((a: any, b: any) => a.type - b.type)
          .map((gen: any) => (
            <p key={gen.type}>
              {capitalize(genders[gen.type - 1])}: {gen.count}
            </p>
          ))}
      </div>
      <div>
        {usersCount.student
          .sort((a: any, b: any) => b.count - a.count)
          .map((stu: any, index: number) => (
            <p key={index}>
              {stu.isStudent ? "Student" : "Employee"}: {stu.count}
            </p>
          ))}
      </div>
      <div>
        {usersCount.year
          .sort((a: any, b: any) => a.yearStudent - b.yearStudent)
          .map((yr: any) => (
            <p key={yr.yearStudent}>
              {numberDisplay[yr.yearStudent - 1]} year: {yr.count}{" "}
            </p>
          ))}
      </div>

      <div>
        <p>Hackathon teams: {usersCount.hack.teams}</p>
        <p>Hackathon participants: {usersCount.hack.participants}</p>
        <div>
          {usersCount.hack.problem
            .sort((a: any, b: any) => a.theme - b.theme)
            .map((statement: any) => (
              <p key={statement.theme}>
                {THEMES[statement.theme]}: {statement.count}
              </p>
            ))}
        </div>
      </div>
      <div>
        <p>Events total: {usersCount.event.total}</p>
        {usersCount.event.event
          .sort((a: any, b: any) => a.type - b.type)
          .map((eve: any) => (
            <p key={eve.type}>
              {EVENTS_DETAILS[eve.type - 1].name}: {eve.count}
            </p>
          ))}
      </div>
    </main>
  )
}
