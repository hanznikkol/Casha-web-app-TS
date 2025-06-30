import { BiReceipt } from "react-icons/bi";
import { TbPigMoney, TbLayoutDashboard, TbChartPie } from "react-icons/tb";
import { NavLink } from "react-router-dom";

type SideNavProp = {
  isCollapsed: boolean;
}
function SideNav({isCollapsed}: SideNavProp) {

  type NavItem = {
    label: string;
    icon: React.ElementType;
    href: string;
  };

  const navItems: NavItem[] = [
    {label: "Overview", icon: TbLayoutDashboard, href: "/"},
    {label: "Transactions", icon: BiReceipt, href: "/transaction"},
    {label: "Budgets", icon: TbChartPie, href: "/budgets"},
    {label: "Goals", icon: TbPigMoney, href: "/goals"},
  ]
  return (
    <>
      <ul className='flex flex-col gap-4'>  
        {navItems.map((item, index) => (
          <NavLink 
            key={index}
            to={item.href}
            className= {
              ({isActive}) => `flex ${isCollapsed? 'justify-center': 'w-full gap-2'} items-center w-full rounded-lg p-3 hover:cursor-pointer duration-100 ${
                isActive? 'bg-primary text-[#fcfcfc] ' : 'bg-[#fcfcfc] text-black'
              }`
            }>
            {({isActive}) => (
              <>
                <item.icon className={`w-6 h-6 ${ isActive ? 'text-[#fcfcfc]' : 'text-black'} group-hover:text-[#fcfcfc] duration-100`} />
                {!isCollapsed && <p>{item.label}</p>}
              </>
            )}
          </NavLink>
        ))}
      </ul>
    </>
  )
}

export default SideNav