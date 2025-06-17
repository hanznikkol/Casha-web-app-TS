import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <Router>
        <div className='bg-white font-poppins flex min-h-screen w-full'>
          <Routes>
            <Route path='' element={<Login></Login>}></Route>
            <Route path='/signup' element={<Register></Register>}></Route>

            {/* Main Pages */}
            <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          </Routes> 
        </div>
      </Router>
    </>
  )
}

export default App
