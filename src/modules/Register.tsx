import SignUpForm from "../components/Login/Form/SignUpForm"

function Register() {
  return (
    <div className='flex flex-col lg:flex-row-reverse justify-center items-center w-full min-h-full overscroll-y-auto px-4 lg:px-0'>
        <div className='bg-primary hidden lg:flex flex-1 flex-col h-full justify-center items-center text-center text-white gap-2'>
            <h1 className=' text-6xl font-archivo'>Casha</h1>
            <p>Simpleng Trackings, Totoong Savings</p>
        </div>

        {/*Form*/} 
        <div className='bg-white flex w-full flex-1 flex-col h-full justify-center items-center text-black gap-4'>
            <SignUpForm/>
        </div>
      
    </div>
  )
}

export default Register