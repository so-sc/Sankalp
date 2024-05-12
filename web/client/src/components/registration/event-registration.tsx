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
import { H3 } from "@/components/ui/typography"
import { useToast } from "@/components/ui/use-toast"
import {
  EVENTS_DETAILS
} from "@/lib/constants"
import { eventSchema } from "@/lib/schemas"
import {
  EventForm,
  EventRegistrationData,
  UserDashboardProfile
} from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCookie } from "cookies-next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  TbLoader2
} from "react-icons/tb"

interface EventRegistrationProps {
  eventId: number
  user: UserDashboardProfile
}

export default function EventRegistration({
  eventId,
  user,
}: EventRegistrationProps) {
  const [error, setError] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  const event = EVENTS_DETAILS[eventId]

  const form = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.PhNo,
      college: user.college,
      totalMembers: event.minMember,
      members: [],
    },
  })

  const totalMembers = form.watch("totalMembers")

  async function onRegister(values: EventForm) {
    const finalValues = {
      ...values,
      members: values.members?.slice(0, totalMembers! - 1),
    }

    const eventData: EventRegistrationData = {
      isEvent: true,
      event: {
        eve: eventId + 1, // Thanks akkil for using 1 index again
        participant: finalValues.members
          ? [
              ...finalValues.members.map((member) => ({
                info: member.email,
              })),
            ]
          : [],
      },
    }

    try {
      setError("")
      const token = getCookie("token")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/app/registration/e`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        }
      )
      const data = await response.json()
      if (data.success) {
        toast({
          title: `Congratulation! Your Registration for ${event.name} is successful`,
          description: "See you on the event day!",
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

  if (user.company) {
    return (
      <div className="mt-4">
        <Notification variant="info" className="flex flex-col">
          Employees are not allowed to participate in the events. But we would
          love to talk and interact with you, reach us out at
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 my-8">
            <p className="mb-2">Your Profile</p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Team leader name"
                      readOnly
                      {...field}
                      value={user.name}
                      className="read-only:bg-foreground/10"
                    />
                  </FormControl>
                  {form.formState.errors.name?.message && (
                    <p className="text-red-500">
                      {form.formState.errors.name?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Team leader email ID"
                      readOnly
                      {...field}
                      value={user.email}
                      className="read-only:bg-foreground/10"
                    />
                  </FormControl>
                  {form.formState.errors.email?.message && (
                    <p className="text-red-500">
                      {form.formState.errors.email?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Team leader Phone number"
                      readOnly
                      {...field}
                      value={user.PhNo}
                      className="read-only:bg-foreground/10"
                    />
                  </FormControl>
                  {form.formState.errors.phone?.message && (
                    <p className="text-red-500">
                      {form.formState.errors.phone?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Team leader Phone number"
                      readOnly
                      {...field}
                      value={user.college}
                      className="read-only:bg-foreground/10"
                    />
                  </FormControl>
                  {form.formState.errors.college?.message && (
                    <p className="text-red-500">
                      {form.formState.errors.college?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>
          {event.minMember !== event.maxMember && (
            <FormField
              control={form.control}
              name="totalMembers"
              render={({ field }) => (
                <div>
                  <FormItem className="flex mb-6 items-center">
                    <FormLabel className="basis-40">Total Members:</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field?.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Total Members" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from(Array(event.maxMember - 1).keys()).map(
                            (_, i) => (
                              <SelectItem
                                value={`${i + event.minMember}`}
                                key={i}
                              >
                                {i + event.minMember} Members
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
          )}
          {event.maxMember === 1 ? (
            <div>
              <p className="text-center font-bold text-lg mb-5">
                This is a solo event you can register directly :)
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-center font-bold text-lg">
                Form a team of{" "}
                {event.minMember === event.maxMember
                  ? event.minMember
                  : `${event.minMember} - ${event.maxMember}`}{" "}
                members (including you)
              </p>
              <div>
                <p className="mb-2">Team Leader</p>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Team leader email ID"
                          readOnly
                          {...field}
                          value={user.email}
                          className="read-only:bg-foreground/10"
                        />
                      </FormControl>
                      {form.formState.errors.email?.message && (
                        <p className="text-red-500">
                          {form.formState.errors.email?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                {Array.from(Array(totalMembers! - 1).keys()).map((i) => (
                  <>
                    <p className="mt-5 mb-2">Team Member {i + 1}</p>
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
                              form.formState.errors.members[i]?.email
                                ?.message && (
                                <p className="text-red-500">
                                  {
                                    form.formState.errors.members[i]?.email
                                      ?.message
                                  }
                                </p>
                              )}
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          {!!event.message && (
            <Notification variant="info" className="mt-2">
              {event.message}
            </Notification>
          )}
          <Button
            type="submit"
            className="mt-4 w-full flex items-center gap-1"
            disabled={form.formState.isSubmitting}
          >
            Register for {event.name}
            {form.formState.isSubmitting && (
              <TbLoader2 className="animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
