import React from 'react'
import NavBar from './navbar/NavBar';
import { Outlet } from 'react-router-dom';

const Layoute = () => {
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default Layoute
