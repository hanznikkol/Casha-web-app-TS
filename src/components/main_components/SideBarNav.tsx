import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { Goal, LayoutDashboard, LogOut, Map, PieChart, Receipt } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import AppHeader from './AppHeader'
import { supabase } from '@/lib/supabase'

function SideBarNav() {

const handleLogout = async() => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error logging out:", error.message);
      return;
    }
    else {
        window.location.href = "/login";
    }
}

const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/" },
    { label: "Transactions", icon: Receipt, href: "/transaction" },
    { label: "Budget", icon: Map, href: "/budget" },
    { label: "Goals", icon: Goal, href: "/goals" },
    { label: "Reports", icon: PieChart, href: "/reports" },
  ]
  return (
    <Sidebar collapsible='icon'>
          <SidebarHeader className='p-4'>
            <AppHeader/>
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
                              hover:text-foreground
                              hover:cursor-pointer
                              "
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
                <SidebarMenuButton onClick={handleLogout}
                  className="
                          hover:bg-destructive
                          hover:text-white
                          hover:cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>

        </Sidebar>
  )
}

export default SideBarNav