/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleButton from './sub_components/GoogleButton'
import InputField from './sub_components/InputField'
import FormAlert from './sub_components/FormAlert'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/button'

function SignUpForm() {
  const [username, setUserName] = useState('')
  const [email, setEmail] =  useState('')
  const [password, setPassword] =  useState('')
  const [cPassword, setCPassword] =  useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const onChangeCPassword = (e: React.ChangeEvent<HTMLInputElement>) => setCPassword(e.target.value)
  
  const handleErrorClose = () => setError('')

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password != cPassword) {
      setError('Your Password is not match')
      setSuccess('')
      return
    }
    
    try {
      const {data , error} = await supabase.auth.signUp({
        email: email.trim(),
        password: password
      })

      if (error) {
        setError(error.message)
        setSuccess('')
        return
      }

      const userID = data.user?.id

      if (!userID) {
        setError('User ID not returned from Supabase.')
        setSuccess('')
        return
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ user_id: userID, username: username.trim()}])

      if (profileError) {
        setError(profileError.message)
        setSuccess('')
        return
      }

      setSuccess('Registration successful! Redirecting you to the login page...')
      setError('')
      setTimeout(() => navigate('/login'), 2500)
      //Reset
      setUserName('')
      setEmail('')
      setPassword('')
      setCPassword('')
    }

    catch (err: unknown){
      setError("Something went wrong.");
      setSuccess("");
    }
    
  }

  return (
    <>
      <h4 className='text-2xl lg:text-3xl mb-4 font-bold'>Create an Account</h4>
      <p className='text-base text-muted-foreground mb-4'>Enter your credentials below to create your account</p>
      
      <form onSubmit={handleRegister} className='flex flex-col gap-6 w-full h-auto px-2 lg:px-16'>
        {/* Error Message */}
        {error && (
          <FormAlert
            type='error'
            message = {error}
            onClose={handleErrorClose}
          ></FormAlert>
        )}
        {/* Error Message */}
        {success && (
          <FormAlert
            type='success'
            message = {success}
          ></FormAlert>
        )}

        <div className='space-y-2'>
          <InputField
            type="text"
            placeholder='Username'
            required = {true}
            onChange={onChangeUsername}></InputField>
          <InputField
            type="email"
            placeholder='name@example.com'
            required = {true}
            onChange={onChangeEmail}></InputField>
          <InputField
            type="password"
            placeholder='Password'
            required = {true}
            onChange={onChangePassword}></InputField>
          <InputField
            type="password"
            placeholder='Confirm Password'
            required = {true}
            onChange={onChangeCPassword}></InputField>
        </div>
        
        {/* Submit Button */}
        <Button type='submit' className='hover:cursor-pointer bg-primary text-white shadow-xl'>Create Account</Button>

        <div className='flex justify-around items-center gap-4 text-muted-foreground text-sm '>
          <div className='w-full h-0.5 bg-muted-foreground'></div>
            <p className='text-nowrap'>OR CONTINUE WITH</p>
          <div className='w-full h-0.5 bg-muted-foreground'></div> 
        </div>

        <GoogleButton firstText={'Sign up'}></GoogleButton>
        
        <div className='flex gap-2 flex-wrap justify-center'>
          <p className='text-sm text-muted-foreground'>Already have an account?</p>
          <p className='underline hover:cursor-pointer text-sm text-muted-foreground font-bold hover:text-destructive duration-150'> <Link to="/login">Login</Link> </p>
        </div>

      </form>
    </>
  )
}

export default SignUpForm