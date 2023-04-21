import React, {useState} from "react";
import {Link} from "react-router-dom";
import {NavBarLinks} from "../../other/NavBarLinks";
import {Languages} from "../umumiyComponents/Languages";

export const NavBar = () => {
    const [uzLan, setUzLan] = useState('');
    const [enLan, setEnLan] = useState('');
    const [ruLan, setRuLan] = useState('');
    const en = localStorage.getItem("enLan")
    const ru = localStorage.getItem("ruLan")

    const lanUz = () => {
        setUzLan(true)
        setEnLan(false)
        setRuLan(false)
        localStorage.setItem('uzLan', true)
        localStorage.setItem('enLan', false)
        localStorage.setItem('ruLan', false)
        window.location.reload()
    }
    const lanEn = () => {
        setUzLan(false)
        setEnLan(true)
        setRuLan(false)
        localStorage.setItem('uzLan', false)
        localStorage.setItem('enLan', true)
        localStorage.setItem('ruLan', false)
        window.location.reload()
    }
    const lanRu = () => {
        setUzLan(false)
        setEnLan(false)
        setRuLan(true)
        localStorage.setItem('uzLan', false)
        localStorage.setItem('enLan', false)
        localStorage.setItem('ruLan', true)
        window.location.reload()
    }
    return (
        <nav className="navbar navbar-expand-lg bg-success navbar-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <i className="bi bi-list text-light" style={{fontSize: '30px'}}/>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link className="col-md-5 navbar-brand text-light" to={"/"}><img src="/assets/logo.png"
                                                                                 className="col-2" alt=""/></Link>
                <ul className="col-md-6 navbar-nav mr-auto mt-2 mt-lg-0 d-flex alegn-items-center justify-content-end">
                    {NavBarLinks.map(item => (
                        <li className="nav-item active">
                            <Link className="nav-link text-light" to={item.page}>{item.name} <span
                                className="sr-only">(current)</span></Link>
                        </li>
                    ))}
                    <div className="dropdown">
                        <button
                            className="btn text-light dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {ru === "true" ? "языки" : en === "true" ? "languages" : "tillar"}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Languages lanUz={lanUz} lanEn={lanEn} lanRu={lanRu}/>
                        </ul>
                    </div>

                </ul>
            </div>
        </nav>
    )
}