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
import {
  MAX_MEMBERS,
  MIN_MEMBERS,
  THEMES,
  numberDisplay,
} from "@/lib/constants"
import { teamSchema } from "@/lib/schemas"
import { HackathonTeam, Member } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TbLoader2 } from "react-icons/tb"

interface HackathonRegistrationProps {
  leader: Member // Well the schema is same for both XD
}

export default function HackathonRegistration({
  leader,
}: HackathonRegistrationProps) {
  const form = useForm<HackathonTeam>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamName: "",
      totalMembers: 2,
      teamTheme: THEMES[0],
      teamStatement: "",
      teamCollege: "",
      leader: leader,
      members: [
        {
          name: "",
          email: "",
          phone: "",
          year: "2",
        },
      ],
    },
  })
  const totalMembers = form.watch("totalMembers")

  function onTeamRegister(values: HackathonTeam) {
    // Fixes the edge case for eg. when the user fills names for 4 members
    // and then changes the total members to less than that
    const finalValues = {
      ...values,
      members: values.members.slice(0, totalMembers - 1),
    }
    console.log(finalValues)
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
          <FormField
            control={form.control}
            name="teamCollege"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="College Name (No abbreivations)"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.teamCollege?.message && (
                  <p className="text-red-500">
                    {form.formState.errors.teamCollege?.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <p className="my-4 text-center">Team Member Details</p>
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
                        value={leader.phone}
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
                    name={`members.${i}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`Team member ${i + 1} name`}
                            {...field}
                          />
                        </FormControl>
                        {form.formState.errors.members &&
                          form.formState.errors.members[i]?.name?.message && (
                            <p className="text-red-500">
                              {form.formState.errors.members[i]?.name?.message}
                            </p>
                          )}
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name={`members.${i}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={`Team member ${i + 1} phone number`}
                            {...field}
                          />
                        </FormControl>
                        {form.formState.errors.members &&
                          form.formState.errors.members[i]?.phone?.message && (
                            <p className="text-red-500">
                              {form.formState.errors.members[i]?.phone?.message}
                            </p>
                          )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`members.${i}.year`}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={`Team member ${
                                  i + 1
                                } year of study`}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1st year</SelectItem>
                            <SelectItem value="2">2nd year</SelectItem>
                            <SelectItem value="3">3rd year</SelectItem>
                            <SelectItem value="4">4th year</SelectItem>
                            <SelectItem value="5">5th year</SelectItem>
                          </SelectContent>
                        </Select>
                        {form.formState.errors.members &&
                          form.formState.errors.members[i]?.year?.message && (
                            <p className="text-red-500">
                              {form.formState.errors.members[i]?.year?.message}
                            </p>
                          )}
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ))}
          </div>
          <Notification variant="info" className="my-4">
            <p>
              Only Team leader has to do the register. The rest of the team need
              not register again
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
