import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppState from './Context/AppState.jsx'
import { TooltipProvider } from './Components/ui/tooltip'
import { SidebarProvider, SidebarTrigger } from './Components/ui/sidebar'
import Navbar from './Components/MyComponents/Navbar'

createRoot(document.getElementById('root')).render(
  <AppState>
  <App /> 
  </AppState>,
)
