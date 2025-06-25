import OverviewSVG from "../../icons/nav_icons/OverviewSVG"
import TransactionSVG from "../../icons/nav_icons/TransactionSVG";
import BudgetSVG from "../../icons/nav_icons/BudgetSVG";

function SideNav() {
  
  type NavItem = {
    label: string;
    icon: React.ReactNode;
  };

  const navItems: NavItem[] = [
    {label: "Overview", icon: <OverviewSVG></OverviewSVG>},
    {label: "Transactions", icon: <TransactionSVG></TransactionSVG>},
    {label: "Budgets", icon: <BudgetSVG></BudgetSVG>},
    {label: "Categories", icon: <OverviewSVG></OverviewSVG>}
    
  ]
  return (
    <>
      <ul className='flex flex-col gap-4'>  
        {navItems.map((item, index) => (
          <li 
            key={index}
            className="flex gap-2 items-center bg-gray-200 w-full p-3 rounded-lg hover:cursor-pointer">

            {item.icon}
            <h1>{item.label}</h1>

          </li>
        ))}
      </ul>
    </>
  )
}

export default SideNav