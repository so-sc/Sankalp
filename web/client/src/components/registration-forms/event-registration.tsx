import { CommonRegistrationProps } from "@/components/registration-forms/register"
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
import { Event, UserProfile } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TbCaretLeftFilled, TbCaretRightFilled } from "react-icons/tb"

export default function EventRegistration({
  setRegistrationData,
  setStep,
}: CommonRegistrationProps) {
  const form = useForm<Event>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      talks: Array(TOTAL_TALKS).fill(false),
      esports: Array(TOTAL_ESPORTS).fill(false),
    },
  })
  function onRegister(values: Event) {
    setRegistrationData((prev: UserProfile) => ({ ...prev, event: values }))
    setStep(3)
  }

  return (
    <Form {...form}>
      <Button
        className="flex gap-2"
        variant="outline"
        onClick={() => setStep(1)}
      >
        <TbCaretLeftFilled /> Prev
      </Button>
      <form onSubmit={form.handleSubmit(onRegister)}>
        <div className="flex flex-col gap-2">
          <p className="text-center mt-2 text-xl">
            Select the Talks you want to register
          </p>
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
          <p className="text-center mt-2 text-xl">
            Select the eSports you want to register
          </p>
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
            Next <TbCaretRightFilled />
          </Button>
        </div>
      </form>
    </Form>
  )
}
