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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { TbLoader2 } from "react-icons/tb"
import { z } from "zod"

// Made this variable at what cost? My brain cells
// Just vary this to change the number of talks and esports
const TOTAL_TALKS = 6
const TOTAL_ESPORTS = 2

// Change this to change the event name of talks and esports
const TALKS = [
  "How to suck at writing Dates - Deveesh Shetty",
  "How to be a God - Akkil MG",
  "Intro to HTML (How to meet Ladies) - Tejas Nayak",
  "How to do damage control - Varshaa Shetty",
  "Asking sponsorships 101 - Pratheeksha",
  "How to ethically get full CGPA - Sushruth Rao",
]
const ESPORTS = ["Ludo 1v1v1v1", "Candy Crush Saga"]

const studentSchema = z.object({
  role: z.literal("student"),
  college: z.string().min(3),
  course: z.string().min(2),
  yearOfStudy: z.enum(["1", "2", "3", "4", "5"]),
  branch: z.string().min(2),
})

const employeeSchema = z.object({
  role: z.literal("employee"),
  company: z.string().min(3),
  designation: z.string().min(2),
})

const eventSchema = z.object({
  talks: z
    .boolean()
    .array()
    .length(TOTAL_TALKS)
    .default(Array(TOTAL_TALKS).fill(false)),
  esports: z
    .boolean()
    .array()
    .length(TOTAL_ESPORTS)
    .default(Array(TOTAL_ESPORTS).fill(false)),
})

const formSchema = z
  .object({
    name: z.string().min(3).max(48),
    email: z.string().email(),
    password: z.string().min(8).max(24),
    passwordConfirmation: z.string().min(8).max(24),
    role: z.union([studentSchema, employeeSchema]),
    event: eventSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  })

try {
  const form = {
    name: "John Doe",
    email: "john@gmail.com",
    password: "password",
    passwordConfirmation: "password",
    role: {
      role: "student",
      college: "Sahyadri College of Engineering and Management",
      course: "BE",
      yearOfStudy: "1",
      branch: "CSE",
    },
    event: {
      talks: [true, false, true, false, false, true],
      esports: [true, false],
    },
  }
  console.log(formSchema.parse(form))
} catch (error) {
  console.log(error)
}

type Step = 1 | 2

export default function Register() {
  const [step, setStep] = useState<Step>(1)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      role: {
        role: "student",
        college: "",
        course: "",
        yearOfStudy: "1",
        branch: "",
      },
      event: {
        talks: Array(TOTAL_TALKS).fill(false),
        esports: Array(TOTAL_ESPORTS).fill(false),
      },
    },
  })

  const userRole = form.watch("role.role")

  function onRegister(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  function handleNext() {
    // Check if the form is filled till events
    try {
      if (form.formState.errors && form.formState.errors.role) {
        return
      }
      setStep(2)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-3/4 mx-auto">
      {/* <H2 className="text-center mb-4">Register to DevHost</H2> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onRegister)}
          className="flex flex-col gap-2"
        >
          {/* Render form based on step */}
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Full name" {...field} />
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
                    <Input type="email" placeholder="Email" {...field} />
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  {form.formState.errors.password?.message && (
                    <p className="text-red-500">
                      {form.formState.errors.password?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.passwordConfirmation?.message && (
                    <p className="text-red-500">
                      {form.formState.errors.passwordConfirmation?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role.role"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 h-full mt-2">
                  <FormLabel>Your Role:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-8"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="student" />
                        </FormControl>
                        <FormLabel className="font-normal">Student</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="employee" />
                        </FormControl>
                        <FormLabel className="font-normal">Employee</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  {form.formState.errors.role?.role?.message && (
                    <p className="text-red-500">
                      {form.formState.errors.role?.role?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            {/* Conditionally render form based on whether the user is student or employee */}
            {userRole === "student" ? (
              <div className="mt-2 flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="role.college"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="College Name (No abbreivations)"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.role?.message && (
                        <p className="text-red-500">
                          {form.formState.errors.role?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role.course"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Course name (BE, BCA, Btech, etc.)"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.role?.message && (
                        <p className="text-red-500">
                          {form.formState.errors.role?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role.branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Branch name (CSE, ISE, etc. If no branch then put NA)"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.role?.message && (
                        <p className="text-red-500">
                          {form.formState.errors.role?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role.yearOfStudy"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your year of study" />
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
                    </FormItem>
                  )}
                />
              </div>
            ) : userRole === "employee" ? (
              <div className="mt-2 flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="role.company"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Company name (No abbreivations)"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.role?.message && (
                        <p className="text-red-500">
                          {form.formState.errors.role?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role.designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Designation"
                          {...field}
                        />
                      </FormControl>
                      {form.formState.errors.role?.message && (
                        <p className="text-red-500">
                          {form.formState.errors.role?.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <div className="text-red-500">
                Something went wrong, please ensure that your role is either
                student or employee. If you are seeing this error, please try
                refreshing.
              </div>
            )}
            {/* <Button
              className="mt-4 flex w-full items-center gap-2"
              onClick={handleNext}
            >
              Next
            </Button> */}
          </div>
          {/* An attempt to make it multistepped failed... I will be back... For now this is working */}
          <div className="flex flex-col gap-2">
            <p className="text-center mt-2 text-xl">
              Select the Talks you want to register
            </p>
            <FormField
              control={form.control}
              name="event.talks"
              render={({ field }) => (
                <div>
                  {field.value.map((item: boolean, index: number) => (
                    <FormItem
                      key={index}
                      className="flex flex-col my-2 gap-1 border-b-2 border-b-foreground/20 pb-2"
                    >
                      <FormLabel className="text-base">
                        {TALKS[index] || "YTD"}
                      </FormLabel>
                      <FormControl className="h-full">
                        <RadioGroup
                          onValueChange={() =>
                            field.onChange([
                              ...field.value.slice(0, index),
                              !item,
                              ...field.value.slice(index + 1),
                            ])
                          }
                          defaultValue={`${item}`}
                          className="flex items-center gap-8 mt-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Attending
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Not attending
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      {form.formState.errors.event?.talks?.message && (
                        <p className="text-red-500">
                          {form.formState.errors.event?.talks?.message}
                        </p>
                      )}
                    </FormItem>
                  ))}
                </div>
              )}
            />
            <p className="text-center mt-2 text-xl">
              Select the eSports you want to register
            </p>
            <FormField
              control={form.control}
              name="event.esports"
              render={({ field }) => (
                <div>
                  {field.value.map((item: boolean, index: number) => (
                    <FormItem
                      key={index}
                      className="flex flex-col my-2 gap-1 border-b-2 border-b-foreground/20 pb-2"
                    >
                      <FormLabel className="text-base">
                        {ESPORTS[index] || "YTD"}
                      </FormLabel>
                      <FormControl className="h-full">
                        <RadioGroup
                          onValueChange={() =>
                            field.onChange([
                              ...field.value.slice(0, index),
                              !item,
                              ...field.value.slice(index + 1),
                            ])
                          }
                          defaultValue={`${item}`}
                          className="flex items-center gap-8 mt-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Attending
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Not attending
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      {form.formState.errors.event?.esports?.message && (
                        <p className="text-red-500">
                          {form.formState.errors.event?.esports?.message}
                        </p>
                      )}
                    </FormItem>
                  ))}
                </div>
              )}
            />
            <Button
              type="submit"
              className="mt-4 w-full flex items-center gap-2"
              disabled={form.formState.isSubmitting}
            >
              Register
              {form.formState.isSubmitting && (
                <TbLoader2 className="animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
      <div>
        <p className="text-center mt-4">
          Already registered?{" "}
          <Link
            href={`?${new URLSearchParams({ state: "login" })}`}
            className="underline underline-offset-2"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
