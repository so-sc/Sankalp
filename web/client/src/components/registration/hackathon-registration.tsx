"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Notification from "@/components/ui/notification"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { H3 } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import {
  MAIN_EVENT_WEBSITE,
  MAX_MEMBERS,
  MIN_MEMBERS,
  THEMES,
  numberDisplay,
} from "@/lib/constants"
import { teamSchema } from "@/lib/schemas"
import {
  HackathonRegistration,
  HackathonTeam,
  Leader,
  UserDashboardProfile,
} from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { TbLoader2 } from "react-icons/tb"

interface HackathonRegistrationProps {
  leader: UserDashboardProfile
}

export default function HackathonRegistration({
  leader,
}: HackathonRegistrationProps) {
  const { toast } = useToast()
  const [error, setError] = useState("")
  const router = useRouter()
  useEffect(() => {
    const token = getCookie("token")
    if (!token) {
      router.push("/?state=login")
      toast({
        title: "Please login to continue",
        variant: "destructive",
      })
    }
  }, [router, toast])

  const form = useForm<HackathonTeam>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamName: "",
      totalMembers: 2,
      teamTheme: THEMES[0],
      teamStatement: "",
      leader: {
        email: leader.email,
        name: leader.name,
        phone: leader.PhNo,
        // @ts-ignore i know it will work trust me
        year: `${leader.year}`, // Using enum list thats why
      },
      members: [
        {
          email: "",
        },
      ],
    },
  })

  const totalMembers = form.watch("totalMembers")
  const teamTheme = form.watch("teamTheme")

  async function onTeamRegister(values: HackathonTeam) {
    // Fixes the edge case for eg. when the user fills names for 4 members
    // and then changes the total members to less than that
    const finalValues = {
      ...values,
      members: values.members.slice(0, totalMembers - 1),
    }

    const hackathonTeamData: HackathonRegistration = {
      name: finalValues.teamName,
      theme: THEMES.findIndex((theme) => theme === finalValues.teamTheme),
      themeDesc: finalValues.teamStatement,
      member: [
        ...finalValues.members.map((member) => ({
          info: member.email,
        })),
      ],
    }

    try {
      const token = getCookie("token")
      setError("")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/app/registration/h`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(hackathonTeamData),
        }
      )

      const data = await response.json()
      if (data.success) {
        toast({
          title: "Congratulation! Team Registration is successful",
          description: "Now, plan on the problem statements and enjoy!",
          variant: "success",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Something went wrong",
          description:
            data.message ??
            "Please try again after a while, if it continues contact support.",
          variant: "destructive",
        })
        setError(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (leader.company) {
    return (
      <div className="mt-4">
        <Notification variant="info" className="flex flex-col">
          Employees are not allowed to participate in the hackathon. But we
          would love to talk and interact with you, reach us out at
          sosc@sahyadri.edu.in
        </Notification>
        <H3 className="text-center my-4">
          Go back to{" "}
          <Link href="/dashboard" className="underline">
            Dashboard
          </Link>
        </H3>
      </div>
    )
  }

  if (leader.hacks?.name) {
    return (
      <div className="mt-8">
        <div>
          <div className="mb-4">
            <p className="text-2xl font-bold text-center">
              Team {leader?.hacks?.name}
            </p>
            <p className="text-center">{leader?.college}</p>
          </div>
          <p>
            <span className="font-bold">{THEMES[leader?.hacks?.theme!]}</span>:{" "}
            {leader?.hacks?.themeDesc}
          </p>
        </div>
        {leader?.hacks?.member.map((member, i) => (
          <div className="flex flex-col" key={member.email}>
            <p className="text-center mx-auto my-4 bg-foreground/10 w-full rounded-lg py-1">
              Team Member {i + 1}
            </p>
            <div className="flex flex-col gap-1">
              <p>Name: {member.name}</p>
              <p>Email: {member.email}</p>
            </div>
          </div>
        ))}
        <Notification variant="success" className="my-5">
          <p>Great team! All the best folks with ❤️ SOSC</p>
        </Notification>
      </div>
    )
  }

  return (
    <div className="mt-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onTeamRegister)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Team Name" {...field} />
                </FormControl>
                {form.formState.errors.teamName?.message && (
                  <p className="text-red-500">
                    {form.formState.errors.teamName?.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalMembers"
            render={({ field }) => (
              <div>
                <FormItem className="flex items-center">
                  <FormLabel className="basis-40">Total Members:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Total Members" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from(Array(MAX_MEMBERS - 1).keys()).map(
                          (_, i) => (
                            <SelectItem value={`${i + MIN_MEMBERS}`} key={i}>
                              {i + MIN_MEMBERS} Members
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
                {form.formState.errors.totalMembers?.message && (
                  <p className="text-red-500">
                    {form.formState.errors.totalMembers?.message}
                  </p>
                )}
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="teamTheme"
            render={({ field }) => (
              <div>
                <FormItem className="flex items-center">
                  <FormLabel className="basis-40">Theme:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Project Theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {THEMES.map((theme, i) => (
                          <SelectItem value={theme} key={theme}>
                            {theme}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
                {form.formState.errors.teamTheme?.message && (
                  <p className="text-red-500">
                    {form.formState.errors.teamTheme?.message}
                  </p>
                )}
              </div>
            )}
          />
          {teamTheme === "Company Specific" && (
            <Notification variant="success">
              Company specific themes will be revealed 3 days before the
              hackathon on our main website. Stay tuned! Fill the statements you
              would like to work on (opinions)
            </Notification>
          )}
          <FormField
            control={form.control}
            name="teamStatement"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Describe your problem statement (maximum 250 characters)"
                    {...field}
                    rows={4}
                    className="resize-none"
                  />
                </FormControl>
                {form.formState.errors.teamStatement?.message && (
                  <p className="text-red-500">
                    {form.formState.errors.teamStatement?.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <p className="my-4 text-center text-xl">Team Member Details</p>
          <div>
            <p className="mb-2">Team Leader</p>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="leader.name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Team leader name"
                        readOnly
                        {...field}
                        value={leader.name}
                        className="read-only:bg-foreground/10"
                      />
                    </FormControl>
                    {form.formState.errors.leader?.name?.message && (
                      <p className="text-red-500">
                        {form.formState.errors.leader?.name?.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leader.email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Team leader email ID"
                        readOnly
                        {...field}
                        value={leader.email}
                        className="read-only:bg-foreground/10"
                      />
                    </FormControl>
                    {form.formState.errors.leader?.email?.message && (
                      <p className="text-red-500">
                        {form.formState.errors.leader?.email?.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leader.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Team leader Phone number"
                        readOnly
                        {...field}
                        value={leader.PhNo}
                        className="read-only:bg-foreground/10"
                      />
                    </FormControl>
                    {form.formState.errors.leader?.phone?.message && (
                      <p className="text-red-500">
                        {form.formState.errors.leader?.phone?.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leader.year"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Team leader year of study"
                        readOnly
                        {...field}
                        value={`${numberDisplay[Number(leader.year) - 1]} year`}
                        className="read-only:bg-foreground/10"
                      />
                    </FormControl>
                    {form.formState.errors.leader?.phone?.message && (
                      <p className="text-red-500">
                        {form.formState.errors.leader?.phone?.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            {Array.from(Array(totalMembers - 1).keys()).map((i) => (
              <>
                <p className="mt-8 mb-2">Team Member {i + 1}</p>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name={`members.${i}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`Team member ${i + 1} email ID`}
                            {...field}
                          />
                        </FormControl>
                        {form.formState.errors.members &&
                          form.formState.errors.members[i]?.email?.message && (
                            <p className="text-red-500">
                              {form.formState.errors.members[i]?.email?.message}
                            </p>
                          )}
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ))}
          </div>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <Notification variant="info" className="my-4">
            <p>
              Only Team leader has to register for the hackathon. The rest of
              the team need not register again. <br />
              Make sure your members are registered to Sankalp before creating
              team for hackathon, so we can autofetch their details. Because we
              value your time :)
            </p>
          </Notification>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full flex items-center gap-1"
          >
            Confirm Registration
            {form.formState.isSubmitting && (
              <TbLoader2 className="animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
