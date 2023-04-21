import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../component/homeComponent/Footer';
import { NavBar } from '../component/homeComponent/NavBar';

export const AuthLayout = () =>{
    return (
        <>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </>
    )
}