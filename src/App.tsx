import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/auth_page/Login'
import Register from './pages/auth_page/Register'
import MainLayout from './pages/main/MainLayout'
import Overview from './pages/main/Overview'

function App() {

  return (
    <>
      <Router>
        <div className='bg-white font-poppins flex min-h-screen w-full'>
          <Routes>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/signup' element={<Register></Register>}></Route>

            {/* Main Pages */}
            <Route path='/' element={<MainLayout></MainLayout>}>
              <Route index path='overview' element={<Overview></Overview>}></Route>
            </Route>
            
          </Routes> 
        </div>
      </Router>
    </>
  )
}

export default App
