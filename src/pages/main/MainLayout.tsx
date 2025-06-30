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
      <div className={`h-full flex flex-col justify-between border-r border-r-gray-200 text-black bg-[#fcfcfc] duration-100 
        ${isCollapsed ? 'w-[4%] px-2 py-4': 'w-[14%] p-4'}`}>
        
        {/* Top List*/}
        <div className={`flex flex-col gap-6 w-full ${isCollapsed ? 'items-center' : ''}`}>
          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-12 h-12 rounded-lg bg-gray-200 flex justify-center items-center text-lg self-center"
          >
            {isCollapsed ? '>' : '<'}
          </button>
      
          {/* App Name */}
            {!isCollapsed && (
              <div className="w-full text-center">
                <h1 className='text-3xl font-archivo text-primary'>Casha</h1>
              </div>
            )}

          {/* Side Nav */}
          <SideNav isCollapsed = {isCollapsed}></SideNav>
        </div>
        
        {/* Bottom List */}
        <div className={`flex flex-col gap-6 w-full ${isCollapsed? 'items-center' : ''}`}>
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