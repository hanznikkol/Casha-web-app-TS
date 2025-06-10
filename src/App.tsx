import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './modules/Login'
import Register from './modules/Register'
import Dashboard from './modules/Dashboard'

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
