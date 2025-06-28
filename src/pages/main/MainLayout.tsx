import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import SideNav from '../../components/main_components/navigation/SideNav'
import { TbUser } from 'react-icons/tb'

function Main() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
      {/* Side Container */}
      <div className={`${isCollapsed ? 'w-[4%] items-center': 'w-[14%]'} h-full flex flex-col justify-between border-r p-4 border-r-gray-200 text-black bg-[#fcfcfc] duration-100`}>
        {/* Top List*/}
        <div className={`${isCollapsed? 'justify-center items-center' : ''} gap-6 w-full flex flex-col`}>
          {/* Button Collapsed */}  
          <button onClick={() => setIsCollapsed(!isCollapsed)} className='w-12 h-12 rounded-lg bg-gray-200 flex justify-center items-center text-lg'> {isCollapsed? '>': '<'} </button>
      
          <div className={`${isCollapsed ? 'hidden': 'block'} w-full text-center`}>
            <h1 className='text-3xl font-archivo text-primary'>Casha</h1>
          </div>

          <SideNav isCollapsed = {isCollapsed}></SideNav>

          
        </div>
        
        {/* Bottom List */}
        <div className={`${isCollapsed? 'justify-center items-center' : ''} gap-6 w-full flex flex-col`}>
          <ul className='flex flex-col gap-4'>
            <NavLink to={'/profile'}  
             className= {({isActive}) => `flex ${isCollapsed? 'justify-center': 'gap-2'} items-center w-full rounded-lg p-3 hover:cursor-pointer duration-100 
             ${isActive? 'bg-primary text-[#fcfcfc] ' : 'bg-[#fcfcfc] text-black'}`}>
        
              {({isActive}) => (
              <>
                <TbUser className={`w-6 h-6 
                ${ isActive ? 'text-[#fcfcfc]' : 'text-black'} group-hover:text-[#fcfcfc] duration-100`} />
                {!isCollapsed && <p>Profile</p>}
              </>
              )}
          </NavLink>
          </ul>
        </div>
      </div>
      
      {/* Main Container*/}
      <div className='h-full w-full bg-off-white p-8'>
        <Outlet/>
      </div>
      
    </div>
    </>    
  )
}

export default Main