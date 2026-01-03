import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { Outlet } from 'react-router';

function App() {

  

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }))
      }
      else {
        dispatch(logout())
      }
    }
    )
      .catch(() => (logout()))
      .finally(() => setLoading(false))
  }, [])


  return !loading ? (
    <div className='min-h-screen w-screen flex flex-wrap text-center bg-secondary'>
      <div className='relative w-screen block'>
        <Header />
        <main>
          <Outlet />
        </main>
        {/* <Footer/> */}
      </div>
    </div>
  ) : null;

}

export default App
