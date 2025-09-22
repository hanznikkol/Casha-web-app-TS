/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleButton from './sub_components/GoogleButton.js'
import InputField from './sub_components/InputField.js'
import FormAlert from './sub_components/FormAlert.js'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/button.js'
import { ensureDefaultCategories } from '@/lib/userSetup.js'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()                                                                    

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
     try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      })
      if (error || !data.user) throw new Error(error?.message || 'Login failed')

      // Ensure default categories for existing users
      await ensureDefaultCategories(data.user.id)

      setSuccess('Login Successfully')
      navigate('/') // redirect to dashboard
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }
  
  return (
    <>
      {/* Text */}
      <h4 className='text-2xl lg:text-3xl mb-4 font-bold'>Login</h4>
      <p className='text-base text-muted-foreground mb-4'>Enter your credentials below to login</p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full h-auto px-2 lg:px-16'>
      {error && <FormAlert message={error} type='error' onClose={() => setError('')} />}

      <div className='space-y-2'>
        <InputField placeholder='name@example.com' type='email' required onChange={e => setEmail(e.target.value)} />
        <InputField placeholder='Password' type='password' required onChange={e => setPassword(e.target.value)} />
        <p className='text-sm underline text-muted-foreground hover:text- hover:cursor-pointer'>Forget Password</p>
      </div>

      <Button type='submit' className='shadow-xl hover:cursor-pointer bg-primary text-white duration-150'>Login</Button>

      <div className='flex justify-around items-center gap-4 text-muted-foreground text-sm'>
        <div className='w-full h-0.5 bg-muted-foreground'></div>
        <p className='text-nowrap'>OR CONTINUE WITH</p>
        <div className='w-full h-0.5 bg-muted-foreground'></div>
      </div>

      <GoogleButton firstText='Continue' />

      <div className='flex gap-2 flex-wrap justify-center'>
        <p className='text-sm text-muted-foreground'>Don't have an account yet?</p>
        <Link className='text-muted-foreground font-bold underline text-sm duration-150 hover:text-destructive hover:cursor-pointer' to='/signup'>Create an account</Link>
      </div>
    </form>
    </>
  )
}

export default LoginForm