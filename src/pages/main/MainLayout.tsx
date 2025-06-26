import { Outlet } from 'react-router-dom'
import SideNav from '../../components/main_components/navigation/SideNav'

function Main() {
  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
      {/* Side Nav */}
      <div className='w-[14%] h-full flex flex-col justify-between border-r p-4 border-r-gray-200 text-black  bg-[#fcfcfc]'>
        {/* Top */}
        <div className='gap-6 flex flex-col'>
          <div className='w-full text-center'>
            <h1 className='text-3xl font-archivo text-primary'>Casha</h1>
          </div>
          <SideNav></SideNav>
        </div>
        
        {/* Bottom */}
        <div className='w-full'>
          <button className='py-3 px-4 bg-red-logout w-full text-white rounded-lg'>Logout</button>
        </div>
      </div>
      {/* Main */}
      <div className='h-full w-full bg-off-white'>
        <Outlet/>
      </div>
    </div>
    </>    
  )
}

export default Main