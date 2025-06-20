import React from 'react'
import SideNav from '../../components/main_components/navigation/SideNav'

function Main() {
  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='w-[12%] h-full flex flex-col border-r border-r-gray-200 text-black p-4 gap-8'>
        <div className='w-full text-center'>
          <h1 className='text-3xl font-archivo text-primary'>Casha</h1>
        </div>
        
        <SideNav></SideNav>
      </div>

      <div className='h-full flex-1 bg-off-white'>

      </div>
    </div>
    </>    
  )
}

export default Main