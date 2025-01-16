import React from 'react'
import { Details, Favourites, Home } from './pages'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components'

function Layout() {

  return (
    <>
        <Navbar />
        <Outlet />
    </>
  )
}

export default Layout