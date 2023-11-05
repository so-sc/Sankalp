import { CommonRegistrationProps } from "@/components/registration/register"
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
import { userSchema } from "@/lib/schemas"
import { Step, User, UserProfile } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TbCaretRightFilled } from "react-icons/tb"

export default function UserRegistration({
  setRegistrationData,
  setStep,
}: CommonRegistrationProps) {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "male",
      role: {
        role: "student",
        college: "",
        course: "",
        yearOfStudy: "1",
        branch: "",
      },
    },
  })

  const userRole = form.watch("role.role")

  function onNextStep(values: User) {
    setRegistrationData((prev: UserProfile) => ({ ...prev, user: values }))
    setStep!((prev: Step) => (prev + 1) as Step)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onNextStep)}
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Phone no." {...field} />
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non Binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {form.formState.errors.gender?.message && (
                  <p className="text-red-500">
                    {form.formState.errors.gender?.message}
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
                      <Input type="text" placeholder="Designation" {...field} />
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

        <Button type="submit" className="mt-4 w-full flex items-center gap-1">
          Next <TbCaretRightFilled />
        </Button>
      </form>
    </Form>
  )
}
