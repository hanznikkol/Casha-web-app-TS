import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

function Overview() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsername = async () => {
      const { data: {user}} = await supabase.auth.getUser()

      if (user) {
        const { data , error } = await supabase.from('profiles').select('username')
        .eq('user_id', user?.id)
        .single()

        if(error) {
          console.error(error)
        }
        else {
          setUsername(data.username)
        }
      }
      setLoading(false)
    } 

    fetchUsername()

  }, [])

  return (
    <div className="w-full h-full"> 
      {loading ? <h1><Skeleton className="h-8 w-48 rounded-md animate-pulse bg-muted" /></h1> : <h1 className="text-2xl"> Welcome, <span className="text-primary font-bold">{username}</span>!</h1>}
    </div>
  )   
}

export default Overview