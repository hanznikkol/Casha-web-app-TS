import React from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from './subcomponents/GoogleButton'
import InputField from './subcomponents/InputField'

function SignUpForm() {
  const [username, setUserName] = React.useState('')
  const [email, setEmail] =  React.useState('')
  const [password, setPassword] =  React.useState('')
  const [cPassword, setCPassword] =  React.useState('')

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const onChangeCPassword = (e: React.ChangeEvent<HTMLInputElement>) => setCPassword(e.target.value)
  return (
    <>
        <h1 className='text-4xl text-primary font-archivo'>Casha</h1>
        <h4 className='text-xl lg:text-3xl'>Fill up to Continue!</h4>

        <form className='flex flex-col gap-6 w-full h-auto px-2 lg:px-16'>
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
          
          <button className='hover:cursor-pointer bg-primary text-white p-3 rounded-xl'>Login</button>

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