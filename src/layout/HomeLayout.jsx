import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom"
import {Loader} from "../component/umumiyComponents/Loader";
import '../styles/home/style.css';
import {NavBar} from "../component/homeComponent/NavBar";
import {Footer} from "../component/homeComponent/Footer";

export const HomeLayout = () => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <div className="col-12">
                {loading ? (
                    <>
                        <NavBar/>
                        <Outlet/>
                        <Footer/>
                    </>
                ) : (
                    <>
                        <Loader/>
                    </>
                )}
            </div>
        </>
    )
}