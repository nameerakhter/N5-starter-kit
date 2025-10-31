'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { trpc } from '@/client/trpc/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addNewUserInput } from '@/server/api/router/user/user.input'

export default function AddUserForm() {
  const form = useForm<z.infer<typeof addNewUserInput>>({
    resolver: zodResolver(addNewUserInput),
    defaultValues: {
      name: '',
      age: '',
      mobileNumber: '',
      email: '',
      password: '',
    },
  })

  const addNewUserMutation = trpc.user.addNewUser.useMutation({
    onSuccess: () => {
      form.reset()
      toast.success('New user added successfully')
    },
    onError: (error) => {
      toast.error('Error adding new user: ' + error.message)
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent">
      <Card className="mx-auto w-full max-w-md">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Add New User</h2>
            <p className="text-muted-foreground text-sm">
              Fill in the details to add a new user to the database.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                addNewUserMutation.mutate(data)
              })}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={addNewUserMutation.isPaused}
              >
                {addNewUserMutation.isPending ? 'Adding User...' : 'Add User'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
