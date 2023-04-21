import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {logout} from '../../handlers/auth'
import {Languages} from "../umumiyComponents/Languages";

export const Header = ({clickToggle}) => {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')
    const lastName = localStorage.getItem('lastName')
    const firstName = localStorage.getItem('firstName')
    const fullName = firstName.toLowerCase() + " " + lastName.toLowerCase()
    const en = localStorage.getItem("enLan")
    const ru = localStorage.getItem("ruLan")
    const uz = localStorage.getItem("uzLan")

    return (
        <header id="header"
                className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <Link to="/admin" className="logo d-flex align-items-center">
               <span className="fw-bold text-uppercase d-none d-lg-block">
                   {ru === "true" ? "Панель управления" : en === "true" ? "Dashboard" : "Boshqaruv paneli"}
               </span>
                </Link>
                <i className="fas fa-bars toggle-sidebar-btn text-primary" style={{fontSize: '25px'}}
                   onClick={clickToggle}/>
            </div>
            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item dropdown pe-3">
                        <h2 className="nav-profile d-flex align-items-center">
                            <span className="pe-2 d-md-block" style={{fontSize: '20px'}}>{fullName}</span>
                            <i className="fas fa-user-circle fs-2"/>
                        </h2>
                    </li>
                    <div className="dropdown">
                        <button
                            className="btn text-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {ru === "true" ? "orqaga" : en === "true" ? "back" : "menyu"}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li className="nav-item pe-3">
                                <button className={"btn dropdown-item btn-outline-primary d-flex align-items-center"}
                                        onClick={() => {
                                            logout(navigate)
                                        }}>
                                    <span>chiqish</span>
                                </button>
                            </li>
                            <li>
                                <Link to={"/"}
                                      className={"btn dropdown-item btn-outline-primary d-flex align-items-center"}
                                      style={{cursor: 'pointer'}}>
                                    <span>orqaga</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </ul>
            </nav>
        </header>
    )
}