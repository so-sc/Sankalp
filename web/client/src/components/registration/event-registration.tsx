import { CommonRegistrationProps } from "@/components/registration/register"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ESPORTS, TALKS, TOTAL_ESPORTS, TOTAL_TALKS } from "@/lib/constants"
import { eventSchema } from "@/lib/schemas"
import { Event, Step, UserProfile } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TbCaretLeftFilled, TbCaretRightFilled } from "react-icons/tb"

interface EventRegistrationProps extends CommonRegistrationProps {
  registrationData: UserProfile
  isUpdation?: boolean
}

export default function EventRegistration({
  setRegistrationData,
  setStep,
  registrationData,
  isUpdation = false,
}: EventRegistrationProps) {
  const form = useForm<Event>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      ...registrationData.event,
    },
  })

  async function onRegister(values: Event) {
    setRegistrationData((prev: UserProfile) => ({ ...prev, event: values }))
    if (!isUpdation) setStep!((prev: Step) => (prev + 1) as Step)
  }

  return (
    <Form {...form}>
      {!isUpdation && (
        <Button
          className="flex gap-2"
          variant="outline"
          onClick={() => setStep!((prev: Step) => (prev - 1) as Step)}
        >
          <TbCaretLeftFilled /> Prev
        </Button>
      )}
      <form onSubmit={form.handleSubmit(onRegister)}>
        <div className="flex flex-col gap-2">
          <div className="text-center mt-2">
            {isUpdation ? (
              <p className="font-bold">Dev Talks</p>
            ) : (
              <p className="text-xl">Select the talks you want to register</p>
            )}
          </div>
          <FormField
            control={form.control}
            name="talks"
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
                    {form.formState.errors.talks?.message && (
                      <p className="text-red-500">
                        {form.formState.errors.talks?.message}
                      </p>
                    )}
                  </FormItem>
                ))}
              </div>
            )}
          />
          <div className="text-center mt-2">
            {isUpdation ? (
              <p className="font-bold">eSports Events</p>
            ) : (
              <p className="text-xl">Select the eSports you want to register</p>
            )}
          </div>
          <FormField
            control={form.control}
            name="esports"
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
                    {form.formState.errors.esports?.message && (
                      <p className="text-red-500">
                        {form.formState.errors.esports?.message}
                      </p>
                    )}
                  </FormItem>
                ))}
              </div>
            )}
          />
          <Button className="mt-4 w-full flex items-center gap-1">
            {isUpdation ? (
              <p>Update Selection</p>
            ) : (
              <p className="flex items-center gap-1">
                Next <TbCaretRightFilled />
              </p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
