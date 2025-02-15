import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from './Header';


const Applayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Applayout;
