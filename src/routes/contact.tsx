import { createFileRoute } from '@tanstack/react-router'

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  phoneNumber: z.number().min(10, "Phone number must be at least 10 characters."),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
})


function Contact() {

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      company: "",
      message: "",
    },
    // validators: {
    //   onSubmit: formSchema,
    // },
    onSubmit: async ({ value }) => {
      console.log(value)
      toast("Message sent!", {
        description: "We'll get back to you as soon as possible.",
      })
    },
  })

  return (
    <main>
      <section className='relative flex-1 flex justify-center items-center  h-60 lg:h-90'>
        <div className='absolute inset-0 bg-[url(https://www.cpduk.co.uk/sites/default/files/news-imported/cpd-benefits-digital-transformation-machinery-cambashi.jpg)] bg-cover bg-center brightness-35' />
        <div className='relative flex items-center justify-center flex-col text-white'>
          <h1 className='font-extrabold lg:text-5xl text-2xl '>Contact Us</h1>
          <Breadcrumb className='mt-2 '>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className='text-white'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbSeparator color='white' />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage className='text-white'>Contact</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-20 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
            <form
              id="contact-form"
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="John Doe"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="john@example.com"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="phoneNumber"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          // type='telephone'
                          placeholder="+1 (555) 000-0000"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="company"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Company</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Company Name (Optional)"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />
              </div>
              <form.Field
                name="message"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="How can we help you?"
                          rows={4}
                          className="resize-none"
                          aria-invalid={isInvalid}
                        />
                      </InputGroup>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  )
                }}
              />
              <Button type="submit">Submit</Button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-6">Contact Details</h2>
            <div className="space-y-6 text-lg">
              <div>
                <h3 className="font-medium mb-2">Address</h3>
                <p className="text-gray-600">
                  123 Dairy Lane<br />
                  Chem City, Pharma State 56789
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Contact</h3>
                <p className="text-gray-600">
                  Email: contact@dairychempharma.com<br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 5:00 PM<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}