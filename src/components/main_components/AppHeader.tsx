import { Wallet } from "lucide-react"
import { SidebarTrigger, useSidebar } from "../ui/sidebar"

export default function AppHeader() {
  const { open } = useSidebar()

  return (
    <div className="flex items-center justify-center w-full">
      <Wallet className="w-6 h-6 text-primary" />
      {open && <span className="ml-2 text-xl font-bold flex-1">Casha</span>}
      <SidebarTrigger className="ml-auto shrink-0" />
    </div>
  )
}