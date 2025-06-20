import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleButton from './partials/GoogleButton.js'
import InputField from './partials/InputField.js'
import FormAlert from './partials/FormAlert.js'
import { supabase } from '../../lib/supabase'

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
    } catch (err: any) {
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
      <h1 className='text-4xl text-primary font-archivo'>Casha</h1>
      <h4 className='text-xl lg:text-3xl mb-4'>Login to Continue!</h4>

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

        <div>
          <InputField
            type = "email"
            label="Email"
            required = {true}
            onChange = {onChangeEmail}
          >
          </InputField>
          
          <InputField
            type = "password"
            label="Password"
            required = {true}
            onChange = {onChangePassword}
          >
          </InputField>

          <p className='underline text-secondary hover:text-secondary-hover hover:cursor-pointer'>Forget Password</p>
        </div>
        
        {/* Submit Button */}
        <button type='submit' className='hover:cursor-pointer bg-primary hover:bg-primary-hover text-white p-3 rounded-xl duration-150'>Login</button>

        <div className='flex justify-around items-center gap-4 px-16'>
          <div className='w-full h-0.5 bg-gray-300'></div>
            <p className='text-gray-500'>or</p>
          <div className='w-full h-0.5 bg-gray-300'></div> 
        </div>

        {/* Google Button */}
        <GoogleButton firstText={'Continue'}></GoogleButton>

        {/* Navigate to Register */}
        <div className='flex gap-2 flex-wrap justify-center'>
          <p className='text-sm lg:text-base'>Don't have an account yet?</p>
          <p className='text-secondary  underline  text-sm lg:text-base duration-150 hover:text-secondary-hover hover:cursor-pointer'> <Link to = '/signup' >Create an account</Link> </p>
        </div>
        
      </form>
    </>
  )
}

export default LoginForm