import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleButton from './subcomponents/GoogleButton'
import InputField from './subcomponents/InputField'
import FormAlert from './subcomponents/FormAlert'

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

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password != cPassword) {
      setError('Your Password is not match')
      setSuccess('')
      return
    }

    // Simulate registration success
    try {
      setSuccess('Registration successful! Redirecting you to the login page...')
      setError('')
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } 
    catch (err){
      setError("Something went wrong.");
      setSuccess("");
    }

    // Reset form fields
    setUserName('')
    setEmail('')
    setPassword('')
    setCPassword('')
  }

  return (
    <>
      <h1 className='text-4xl text-primary font-archivo'>Casha</h1>
      <h4 className='text-xl lg:text-3xl mb-4'>Fill up to Continue!</h4>
      
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

        <div>
          <InputField
            type="text"
            label= "Username"
            required = {true}
            onChange={onChangeUsername}
          ></InputField>
          <InputField
            type="email"
            label= "Email"
            required = {true}
            onChange={onChangeEmail}></InputField>
          <InputField
            type="password"
            label= "Password"
            required = {true}
            onChange={onChangePassword}></InputField>
          <InputField
            type="password"
            label= "Confirm Password"
            required = {true}
            onChange={onChangeCPassword}></InputField>
        </div>
        
        {/* Submit Button */}
        <button type='submit' className='hover:cursor-pointer bg-primary text-white p-3 rounded-xl'>Register</button>

        <div className='flex justify-around items-center gap-4 px-16'>
          <div className='w-full h-0.5 bg-gray-300'></div>
            <p className='text-gray-500'>or</p>
          <div className='w-full h-0.5 bg-gray-300'></div> 
        </div>

        <GoogleButton firstText={'Sign Up'}></GoogleButton>
        
        <div className='flex gap-2 flex-wrap justify-center'>
          <p className='text-sm lg:text-base'>Already have an account?</p>
          <p className='text-secondary underline hover:cursor-pointer text-sm lg:text-base'> <Link to="/">Login</Link> </p>
        </div>

      </form>
    </>
  )
}

export default SignUpForm