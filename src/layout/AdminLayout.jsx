import React, {useEffect, useState} from 'react'
import {Outlet, useNavigate, useLocation} from 'react-router-dom'
import {Header} from '../component/adminComponent/Header'
import {Sidebar} from '../component/adminComponent/SideBar'
import {isAuthenticated} from '../handlers/auth'
import {NotFoundPages} from '../pages/NotFoundPages'
import '../styles/admin/css/style.css'
import '../styles/admin/js/main'
import {FooterAdmin} from "../component/adminComponent/FooterAdmin";
import {Loader} from "../component/umumiyComponents/Loader";

export const AdminLayout = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)
    const role = localStorage.getItem('role')
    const location = useLocation()

    if ((location.pathname === '/admin' ||
        location.pathname === '/admin/menyu' ||
        location.pathname === '/admin/sms' ||
        location.pathname === '/admin/back') && role === 'undefained' || role === 'undefained' || localStorage.length === 0) {
        navigate('/')
    }

    useEffect(() => {
        const redirectAdminPanel = () => {
            const token = localStorage.getItem('token');
            const isAuth = isAuthenticated(token)
            if (!isAuth) return navigate('/')
            setLoading(true)
        }
        redirectAdminPanel()
    })

    const clickToggle = () => {
        setToggle(!toggle)
    }

    return (
        <>
            {role === "Admin" ? (
                <>
                    <Header clickToggle={clickToggle}/>
                    <Sidebar clickToggle={clickToggle} toggle={toggle}/>
                    <main id='main' className={'main'} style={{marginLeft: toggle && '0'}}>
                        {loading ? (
                            <>
                                <Outlet/>
                            </>
                        ) : (
                            <>
                                <Loader/>
                            </>
                        )}
                    </main>
                    <FooterAdmin/>
                </>
            ) : (
                <NotFoundPages/>
            )}
        </>
    )
}