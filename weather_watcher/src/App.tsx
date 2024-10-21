import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from './AppRoutes';

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Link to="/location">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </Link>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}