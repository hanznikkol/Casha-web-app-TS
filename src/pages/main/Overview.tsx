import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

function Overview() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsername = async () => {
      const { data: {user}} = await supabase.auth.getUser()

      if (user) {
        const { data , error } = await supabase
        .from('profiles')
        .select('username')
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
      {loading ? <h1></h1> : <h1 className="text-2xl duration-50"> Welcome, <span className="text-primary font-bold">{username}</span>!</h1>}
    </div>
  )   
}

export default Overview