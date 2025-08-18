/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleButton from './partials/GoogleButton.js'
import InputField from './partials/InputField.js'
import FormAlert from './partials/FormAlert.js'
import { supabase } from '../../lib/supabase'
import { Button } from '../ui/button.js'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()                                                                    

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      if (error) {
        setError(error.message)
        setSuccess('')
        return
      }

      setSuccess('Login Successfully')
      console.log(success)
      setError('');
      navigate('/overview'); // or your destination
    } catch (err: unknown) {
      console.error('Unexpected error:', err);
      setError('Something went wrong. Please try again.');
    }
    
  }
  
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const handleErrorClose = () => setError('')
  
  return (
    <>
      {/* Text */}
      <h4 className='text-2xl lg:text-3xl mb-4 font-bold'>Login</h4>
      <p className='text-base lg:text-lg text-muted-foreground mb-4'>Enter your credentials below to login</p>
      {/* Form */}
      <form onSubmit = {handleSubmit} className='flex flex-col gap-6 w-full h-auto px-2 lg:px-16'>
        {/* Error Message */}
        {error && (
          <FormAlert 
            message= {error}
            type = 'error'
            onClose={handleErrorClose}
            >
          </FormAlert>
        )}

        <div className='space-y-2'>
          <InputField
            placeholder='name@example.com'
            type = "email"
            required = {true}
            onChange = {onChangeEmail}
          >
          </InputField>
          
          <InputField
            placeholder='Password'
            type = "password"
            required = {true}
            onChange = {onChangePassword}
          >
          </InputField>

          <p className=' text-sm lg:text-base underline text-muted-foreground hover:text-secondary-hover hover:cursor-pointer'>Forget Password</p>
        </div>
        
        {/* Submit Button */}
        <Button type='submit' className='shadow-xl hover:cursor-pointer bg-primary text-white duration-150'>Login</Button>

        <div className='flex justify-around items-center gap-4 text-muted-foreground text-sm lg:text-base'>
          <div className='w-full h-0.5 bg-muted-foreground'></div>
            <p className='text-nowrap'>OR CONTINUE WITH</p>
          <div className='w-full h-0.5 bg-muted-foreground'></div> 
        </div>

        {/* Google Button */}
        <GoogleButton firstText={'Continue'}></GoogleButton>

        {/* Navigate to Register */}
        <div className='flex gap-2 flex-wrap justify-center'>
          <p className='text-sm lg:text-base text-muted-foreground'>Don't have an account yet?</p>
          <p className='text-muted-foreground font-bold underline text-sm lg:text-base duration-150 hover:text-secondary-hover hover:cursor-pointer'> <Link to = '/signup' >Create an account</Link> </p>
        </div>
        
      </form>
    </>
  )
}

export default LoginForm