import { Outlet } from 'react-router-dom'
import { 
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import SideBarNav from '@/components/main_components/SideBarNav'

function Main() {
  
  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
      
      <SidebarProvider>
        {/* Side Nav Desktop */}
        <SideBarNav></SideBarNav>

        {/* Side Nav Mobile View + The main container */}
        <div className='flex flex-1 flex-col'>
          {/* Mobile Header */}
          <header className='flex items-center gap-2 p-4 border-b lg:hidden'>
            <SidebarTrigger></SidebarTrigger>
            <h1 className="font-bold text-xl text-primary">Casha</h1>
          </header>

          {/* Main Container*/}
          <main className='h-full w-full bg-off-white p-4'>
            <Outlet/>
          </main>
        </div>

      </SidebarProvider>

    </div>
    </>    
  )
}

export default Main