import React from "react";
import { Outlet } from "react-router-dom";
import NavbarDefault from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
    return (
        <>
        <NavbarDefault/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default MainLayout;