import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/auth_page/Login'
import Register from './pages/auth_page/Register'
import MainLayout from './pages/main/MainLayout'
import Overview from './pages/main/Overview'
import Transaction from './pages/main/Transaction'
import Budget from './pages/main/Budget'
import Goals from './pages/main/Goals'
import Reports from './pages/main/Reports'
import LandingPage from './pages/Landing'

function App() {

  return (
    <>
      <Router>
        <div className='bg-white font-dmSans flex min-h-screen w-full'>
          <Routes>
            {/* Landing Page */}
            <Route path='/' element={<LandingPage></LandingPage>}/>
            
            {/* Auth Pages */}
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/signup' element={<Register></Register>}></Route>

            {/* Main Pages */}
            <Route path='/' element={<MainLayout></MainLayout>}>
              <Route index element={<Overview></Overview>}></Route>
              <Route path='transaction' element={<Transaction></Transaction>}></Route>
              <Route path='budget' element={<Budget></Budget>}></Route>
              <Route path='goals' element={<Goals></Goals>}></Route>
              <Route path='reports' element={<Reports></Reports>}></Route>
            </Route>
            
          </Routes> 
        </div>
      </Router>
    </>
  )
}

export default App
