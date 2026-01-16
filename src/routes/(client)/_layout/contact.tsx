import { createFileRoute } from '@tanstack/react-router'
import dairychem from '@/data/dairychem.json';

import { useForm as useReactForm } from "@tanstack/react-form"
import { toast } from "sonner"
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
import { Mail, Phone } from 'lucide-react';

export const Route = createFileRoute('/(client)/_layout/contact')({
  component: Contact,
})


function Contact() {
  const form = useReactForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      company: "",
      message: "",
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        const response = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        })
        if (response.ok) {
          toast("Message sent!", {
            description: "We'll get back to you as soon as possible.",
          })
          formApi.reset()
        } else {
          toast.error("Failed to send message")
        }
      } catch (error) {
        toast.error("Error sending message")
      }
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

      <div className="container mx-auto px-4 lg:px-50 py-8">

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
                          required autoFocus 
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
                          type="email"
                          required
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
                          type='tel'
                          placeholder="+91 (555) 000-0000"
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
                          rows={3}
                          className="resize-y min-h-30 max-h-60"
                          aria-invalid={isInvalid}
                          required
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
          <div className='bg-primary p-8 rounded-2xl text-white'>
            <h2 className="text-xl font-semibold mb-6">Contact Details</h2>
            <div className="space-y-6 text-lg">
              <div>
                <h3 className="font-bold mb-2">Address</h3>
                <p className="text-gray-200 text-sm">
                  {dairychem[0].address}
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Contact</h3>
                {
                  dairychem[0].phone.map((phone, index) => (
                    <p key={index} className="flex gap-2 text-sm items-center text-gray-200">
                      <Phone size={16} /> {phone}<br />
                    </p>
                  ))
                }
              </div>
              <div>
                <h3 className="font-bold mb-2">Email Us</h3>
                {
                  dairychem[0].email.map((email, index) => (
                    <p key={index} className="flex gap-2 text-sm items-center text-gray-200">
                      <Mail size={16} /> {email}<br />
                    </p>
                  ))
                }
              </div>
              <div>
                <h3 className="font-bold mb-2">Business Hours</h3>
                <p className="flex gap-2 text-sm items-center text-gray-200">
                  Monday to Saturday <br/>
                  9:00 AM to 6:00 PM<br/>
                  Sunday Closed
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}