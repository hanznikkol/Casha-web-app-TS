import { NavLink, Outlet } from 'react-router-dom'
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton,
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger,
  useSidebar} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  PiggyBank,
  User,
  Wallet,
} from "lucide-react"


function AppHeader() {
  const { open } = useSidebar()

  return (
    <div className="flex items-center justify-center w-full">
      <Wallet className="w-6 h-6 text-primary" />
      {open && <span className="ml-2 text-xl font-bold flex-1">Casha</span>}
      <SidebarTrigger className="ml-auto shrink-0" />
    </div>
  )
}

function Main() {
  const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/" },
    { label: "Transactions", icon: Receipt, href: "/transaction" },
    { label: "Budgets", icon: PieChart, href: "/budgets" },
    { label: "Goals", icon: PiggyBank, href: "/goals" },
  ]

  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
      <SidebarProvider>
        <Sidebar collapsible='icon'>
          <SidebarHeader className='p-4'>
            <AppHeader />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item, i) => (
                    <SidebarMenuItem key={i}>
                      <NavLink to={item.href}>
                        {({ isActive }) => (
                          <SidebarMenuButton
                            isActive={isActive}
                            className="
                              data-[active=true]:bg-primary
                              data-[active=true]:text-white
                              data-[active=true]:hover:bg-primary/90
                              hover:bg-accent
                              hover:text-foreground"
                          >
                            <item.icon
                              className={`w-5 h-5 ${
                                isActive ? "text-white" : "text-foreground"
                              }`}
                            />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>


          {/* Footer */}
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/profile">
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}
                      className="
                              data-[active=true]:bg-primary
                              data-[active=true]:text-white
                              data-[active=true]:hover:bg-primary/90
                              hover:bg-accent
                              hover:text-foreground"
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>

        </Sidebar>
      </SidebarProvider>
      
      {/* Main Container*/}
      <main className='h-full w-full bg-off-white p-8'>
        <Outlet/>
      </main>
      
    </div>
    </>    
  )
}

export default Main