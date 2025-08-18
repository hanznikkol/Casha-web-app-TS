import SignUpForm from "../../components/auth_components/SignUpForm"

function Register() {
  return (
    <div className='flex flex-col lg:flex-row justify-center items-center w-full min-h-full overscroll-y-auto px-4 lg:px-0'>
      {/*Form*/} 
      <div className=' flex w-full flex-1 flex-col h-full items-center text-black gap-4 p-6 lg:p-12'>
          <div className="w-full items-center">
            <h1 className='text-4xl text-primary font-archivo'>Casha</h1>
          </div>
          
          <div className="w-full p-4 flex flex-col justify-center h-full items-center">
              <SignUpForm/>
          </div>
      </div>
      {/* Design */}
      <div className=' hidden lg:flex flex-1 flex-col h-full justify-center items-center text-center text-white gap-2'>
      
      </div>
      
    </div>
  )
}

export default Register