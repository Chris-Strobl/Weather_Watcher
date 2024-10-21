import ww_logo from './assets/ww_logo.svg'
import cloud_logo from './assets/cloud_logo.svg'
import menu_icon from './assets/menu_icon.svg'
import './App.css'
import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Link className="logo-home-link" to="/">
          <img src={ww_logo} className="logo" alt="Weather Watcher logo" />
        </Link>
        <button className="menu-button">
          <img src={menu_icon} className="menu-icon" alt="Menu button icon"/>
        </button>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}