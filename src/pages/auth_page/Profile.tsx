import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useNavigate } from "react-router-dom"

const Profile: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if(error) {
      console.error("Error logging out:", error.message);
      return;
    }
    navigate("/login")
  }

  return (
    <div className="">
      <h1 className="text-2xl mb-4">Profile</h1>
      <Button className="hover:cursor-pointer" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Profile