import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/config/firebaseConfig'


export const Route = createFileRoute('/admin/login')({
  component: RouteComponent,
})

function RouteComponent() {

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate({ to: '/admin/products' })
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setError('Invalid email or password')
      } else if (err.code === 'auth/wrong-password') {
        setError("Wrong Password")
      }
      else {
        setError('Failed to login')
        throw err;
      }
    } finally {
      setLoading(false)
    }
  }

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <main>

      <div className='grid grid-cols-1 lg:grid-cols-2 min-h-screen'>
        <div className=' hidden lg:hidden items-center justify-center'>
          <img src="/logo.jpeg" className='' alt="" />
        </div>

        <div className='flex col-span-2 items-center justify-center'>
          <div>
            <Link to='/'><h1 className='text-lg text-center mb-3 md:text-2xl font-black text-primary'>DairyChem Pharma Machineries</h1></Link>
            <Card className=''>
              <CardContent>
                <form onSubmit={handleLogin} className='lg:min-w-sm  flex flex-col gap-4'>
                  <Field>
                    <FieldLabel>Admin Email</FieldLabel>
                    <Input
                      value={email}
                      placeholder='admin@company.com'
                      onChange={(e) => setEmail(e.target.value)}
                      name='email' autoFocus
                      type='email'
                    />

                  </Field>
                  <Field>
                    <FieldLabel>Admin Password</FieldLabel>
                    <Input
                      value={password}
                      placeholder='**********'
                      onChange={(e) => setPassword(e.target.value)}
                      type='password'
                    />

                  </Field>
                  <Button className='flex-1'>Login</Button>
                </form>
                <p className='text-center text-destructive text-sm mt-3'>{error}</p>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>

    </main>
  )
}
