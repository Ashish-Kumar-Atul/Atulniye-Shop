import { useState } from 'react'
import './App.css'
import NavbarDefault from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
    <NavbarDefault/>
    <main className="min-h-[60vh]"></main>
    <Footer />
    </>
  )
}

export default App