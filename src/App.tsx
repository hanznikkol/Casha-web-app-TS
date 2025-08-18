import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/auth_page/Login'
import Register from './pages/auth_page/Register'
// import MainLayout from './pages/main/MainLayout'
// import Overview from './pages/main/Overview'
// import Transaction from './pages/main/Transaction'
// import Budgets from './pages/main/Budgets'
// import Goals from './pages/main/Goals'
// import Profile from './pages/auth_page/Profile'

function App() {

  return (
    <>
      <Router>
        <div className='bg-white font-dmSans flex min-h-screen w-full'>
          <Routes>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/signup' element={<Register></Register>}></Route>

            {/* Main Pages */}
            {/* <Route path='/' element={<MainLayout></MainLayout>}>
              <Route index element={<Overview></Overview>}></Route>
              <Route path='transaction' element={<Transaction></Transaction>}></Route>
              <Route path='budgets' element={<Budgets></Budgets>}></Route>
              <Route path='goals' element={<Goals></Goals>}></Route>
              <Route path='profile' element={<Profile></Profile>}></Route>
            </Route> */}
            
          </Routes> 
        </div>
      </Router>
    </>
  )
}

export default App
