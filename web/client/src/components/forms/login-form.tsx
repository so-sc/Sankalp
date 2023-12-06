import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "lucide-react"
import { TbLoader2 } from "react-icons/tb"

interface LoginFormProps {
  form: any
  onLogin: any
  isLoading: boolean
  error: string
  children?: React.ReactNode
  isVerify?: boolean
}

export default function LoginForm({
  form,
  onLogin,
  isLoading,
  error,
  children,
  isVerify,
}: LoginFormProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onLogin)}
          className="flex flex-col gap-2"
        >
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
                  <Input
                    type="password"
                    placeholder="Password (Authorization ID which you got in mail)"
                    {...field}
                  />
                </FormControl>
                {form.formState.errors.password?.message && (
                  <p className="text-red-500">
                    {form.formState.errors.password?.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4 flex items-center gap-2"
            disabled={isLoading}
          >
            {isVerify ? "Verify" : "Login"}
            {isLoading && <TbLoader2 className="animate-spin" />}
          </Button>
        </form>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </Form>
      <div>{children}</div>
    </div>
  )
}
