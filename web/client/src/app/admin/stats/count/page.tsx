import { isAdminLoggedIn } from "@/app/admin/stats/hackathon/page"
import { H1, H2 } from "@/components/ui/typography"
import {
  EVENTS_DETAILS,
  MAIN_EVENT_NAME,
  THEMES,
  genders,
  numberDisplay,
} from "@/lib/constants"
import { capitalize } from "@/lib/utils"
import { cookies } from "next/headers"

async function getRegistrationCount() {
  const cookieObj = cookies()
  const adminToken = cookieObj.get("admin-token")?.value
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/statistics/count`,
    "https://sankalp-api.sosc.org.in/api/admin/statistics/count",
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
  await isAdminLoggedIn()
  const usersCount = await getRegistrationCount()
  return (
    <main className="container my-20">
      <div className="mb-4">
        <H1>{MAIN_EVENT_NAME} Registration Data</H1>
        <p className="text-2xl border-b mt-3 pb-2">
          Total Users Registered:{" "}
          <span className="font-bold">{usersCount.users}</span>
        </p>
      </div>

      <div className="mb-8 py-4 pb-2 border-b">
        <div className="grid md:grid-cols-2 gap-4 gap-y-8">
          <div className="flex justify-center gap-8">
            {usersCount.gender
              .sort((a: any, b: any) => a.type - b.type)
              .map((gen: any) => (
                <div
                  key={gen.type}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <p className="text-3xl md:text-5xl rounded-full flex justify-center items-center">
                    {gen.count}
                  </p>
                  <p className="text-base md:text-lg">
                    {capitalize(genders[gen.type - 1])}
                  </p>
                </div>
              ))}
          </div>
          <div className="flex justify-center gap-8">
            {usersCount.student
              .sort((a: any, b: any) => b.count - a.count)
              .map((stu: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <p className="text-3xl md:text-5xl rounded-full flex justify-center items-center">
                    {stu.count}
                  </p>
                  <p className="text-base md:text-lg">
                    {stu.isStudent ? "Student" : "Employee"}
                  </p>
                </div>
              ))}
          </div>
          <div className="flex justify-center gap-8 col-span-full">
            {usersCount.year
              .sort((a: any, b: any) => a.yearStudent - b.yearStudent)
              .map((yr: any) => (
                <div
                  key={yr.yearStudent}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <p className="text-3xl md:text-5xl rounded-full flex justify-center items-center">
                    {yr.count}
                  </p>
                  <p className="text-base md:text-lg">
                    {numberDisplay[yr.yearStudent - 1]} year
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <p className="text-2xl mt-3 pb-2">
              Hackathon Teams:{" "}
              <span className="font-bold">{usersCount.hack.teams}</span>
            </p>
            <p className="text-2xl pb-2">
              Hackathon Participants:{" "}
              <span className="font-bold">{usersCount.hack.participants}</span>
            </p>
          </div>
          <div className="flex justify-center gap-8">
            {usersCount.hack.problem
              .sort((a: any, b: any) => a.theme - b.theme)
              .map((statement: any) => (
                <div
                  key={statement.theme}
                  className="flex flex-col justify-center items-center gap-2"
                >
                  <p className="text-3xl md:text-5xl rounded-full flex justify-center items-center">
                    {statement.count}
                  </p>
                  <p className="text-base md:text-lg">
                    {THEMES[statement.theme]}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <p className="text-2xl mt-6 pb-2">
          Total Events Registration:{" "}
          <span className="font-bold">{usersCount.event.total}</span>
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {usersCount.event.event
            .sort((a: any, b: any) => a.type - b.type)
            .map((eve: any) => (
              <div
                key={eve.type}
                className="flex flex-col justify-center items-center gap-2"
              >
                <p className="text-3xl md:text-5xl rounded-full flex justify-center items-center">
                  {eve.count}
                </p>
                <p className="text-base md:text-lg">
                  {EVENTS_DETAILS[eve.type - 1].name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </main>
  )
}
