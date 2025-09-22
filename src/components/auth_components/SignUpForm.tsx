/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleButton from './sub_components/GoogleButton'
import InputField from './sub_components/InputField'
import FormAlert from './sub_components/FormAlert'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/button'
import { addDefaultCategories } from '@/lib/userSetup'

function SignUpForm() {
  const [username, setUserName] = useState('')
  const [email, setEmail] =  useState('')
  const [password, setPassword] =  useState('')
  const [cPassword, setCPassword] =  useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  
  const resetForm = () => {
    setUserName('')
    setEmail('')
    setPassword('')
    setCPassword('')
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
     
    if (password !== cPassword) return setError('Passwords do not match')
    
    try {
      const {data , error} = await supabase.auth.signUp({
        email: email.trim(),
        password: password
      })
      if (error || !data.user) throw new Error(error?.message || 'User ID not returned')

      const userID = data.user?.id

      // Create profile + default categories
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ user_id: userID, username: username.trim() }])
      if (profileError) throw new Error(profileError.message)

      await addDefaultCategories(userID)

      setSuccess('Registration successful! Redirecting...')
      resetForm()
      setTimeout(() => navigate('/login'), 2000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
    
  }

  return (
    <>
      <h4 className='text-2xl lg:text-3xl mb-4 font-bold'>Create an Account</h4>
      <p className='text-base text-muted-foreground mb-4'>Enter your credentials below to create your account</p>
      
       <form onSubmit={handleRegister} className='flex flex-col gap-6 w-full h-auto px-2 lg:px-16'>
        {error && <FormAlert type='error' message={error} onClose={() => setError('')} />}
        {success && <FormAlert type='success' message={success} />}

        <div className='space-y-2'>
          <InputField type='text' placeholder='Username' required onChange={e => setUserName(e.target.value)} />
          <InputField type='email' placeholder='name@example.com' required onChange={e => setEmail(e.target.value)} />
          <InputField type='password' placeholder='Password' required onChange={e => setPassword(e.target.value)} />
          <InputField type='password' placeholder='Confirm Password' required onChange={e => setCPassword(e.target.value)} />
        </div>

        <Button type='submit' className='hover:cursor-pointer bg-primary text-white shadow-xl'>Create Account</Button>

        <div className='flex justify-around items-center gap-4 text-muted-foreground text-sm'>
          <div className='w-full h-0.5 bg-muted-foreground'></div>
          <p className='text-nowrap'>OR CONTINUE WITH</p>
          <div className='w-full h-0.5 bg-muted-foreground'></div>
        </div>

        <GoogleButton firstText='Sign up' />

        <div className='flex gap-2 flex-wrap justify-center'>
          <p className='text-sm text-muted-foreground'>Already have an account?</p>
          <Link className='underline font-bold text-sm text-muted-foreground hover:text-destructive duration-150' to="/login">Login</Link>
        </div>
      </form>
    </>
  )
}

export default SignUpForm