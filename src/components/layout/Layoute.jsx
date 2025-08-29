import React from 'react'
import NavBar from './navbar/NavBar';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const Layoute = () => {
  return (
    <>
    <ScrollRestoration/>
      <NavBar/>
      <Outlet/>
    </>
  )
}

export default Layoute
