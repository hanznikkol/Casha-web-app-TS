import OverviewSVG from "../../icons/nav_icons/OverviewSVG"

function SideNav() {
  
  type NavItem = {
    label: string;
    icon: React.ReactNode;
  };

  const navItems: NavItem[] = [
    {label: "Overview", icon: <OverviewSVG></OverviewSVG>},
    {label: "Overview", icon: <OverviewSVG></OverviewSVG>},
    {label: "Overview", icon: <OverviewSVG></OverviewSVG>},
    {label: "Overview", icon: <OverviewSVG></OverviewSVG>},
  ]
  return (
    <>
      <ul className='flex flex-col gap-4'>  
        {navItems.map((item, index) => (
          <li 
            key={index}
            className="flex gap-4 items-center bg-gray-200 w-full py-3 px-4 rounded-lg">

            {item.icon}
            <h1>{item.label}</h1>

          </li>
        ))}
      </ul>
    </>
  )
}

export default SideNav