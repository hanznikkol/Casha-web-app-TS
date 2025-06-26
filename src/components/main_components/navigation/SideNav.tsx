import { BiReceipt } from "react-icons/bi";
import { TbPigMoney, TbCategoryPlus, TbLayoutDashboard } from "react-icons/tb";
import { NavLink } from "react-router-dom";
function SideNav() {
  
  type NavItem = {
    label: string;
    icon: React.ElementType;
    href: string;
  };

  const navItems: NavItem[] = [
    {label: "Overview", icon: TbLayoutDashboard, href: "/"},
    {label: "Transactions", icon: BiReceipt, href: "/transaction"},
    {label: "Budgets", icon: TbPigMoney, href: "/budgets"},
    {label: "Categories", icon: TbCategoryPlus, href: "/categories"}
    
  ]
  return (
    <>
      <ul className='flex flex-col gap-4'>  
        {navItems.map((item, index) => (
          <NavLink 
            key={index}
            to={item.href}
            className= {
              ({isActive}) => `flex gap-2 items-center w-full rounded-lg p-3 hover:cursor-pointer duration-100 ${
                isActive? 'bg-primary text-white ' : 'bg-white text-black'
              }`
            }>
            {({isActive}) => (
              <>
                <item.icon className={`w-6 h-6 ${ isActive ? 'text-white' : 'text-black'} group-hover:text-white duration-100`} />
                <h1>{item.label}</h1>
              </>
            )}
          </NavLink>
        ))}
      </ul>
    </>
  )
}

export default SideNav