import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useMediaQuery} from 'react-responsive'
import {embeddedGet} from "../../base/service/service";

export const Sidebar = ({toggle, clickToggle}) => {
    const view = localStorage.getItem("view")
    const isMobile = useMediaQuery({maxWidth: 1199})
    const role = localStorage.getItem('role')
    const location = useLocation().pathname
    const uz = localStorage.getItem('uzLan')
    const en = localStorage.getItem('enLan')
    const ru = localStorage.getItem('ruLan')

    if (location === "/admin/message") {
        localStorage.setItem("view", '0')
    }

    const navLinkInfos = role === 'Admin' ? [
        {
            title: ru === "true" ? "Домашняя страница" : en === "true" ? "Homepage" : "Bosh sahifa",
            link: '/admin',
            icon: 'fas fa-home'
        },
        {
            title: ru === "true" ? "Основное изображение" : en === "true" ? "main picture" : "asosiy rasm",
            link: '/admin/carusel',
            icon: 'bi bi-images'
        },
        {
            title: ru === "true" ? "ds" : en === "true" ? "message" : "sms",
            link: '/admin/message',
            icon: 'bi bi-chat-dots-fill'
        },
        {
            title: ru === "true" ? "work" : en === "true" ? "work" : "ishlarim",
            link: '/admin/working',
            icon: 'bi bi-person-workspace'
        },
        {
            title: ru === "true" ? "work" : en === "true" ? "videos" : "videolar",
            link: '/admin/videos',
            icon: 'bi bi-play-btn-fill'
        }
    ] : [
        ""
    ]

    return (
        <div className={toggle ? 'toggle-sidebar' : ''}>
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    {navLinkInfos.map(item => (
                        <li className={'nav-item'} key={item.link}>
                            <Link className={location === item.link ? `nav-link pb-0 bg-primary` : 'nav-link pb-0'}
                                  to={item.link} onClick={isMobile && clickToggle}>
                        <span className={'card-title pb-0 pt-0'}>
                           <i className={location === item.link ? `${item.icon} text-white` : `${item.icon}`}/>
                        </span>
                                <span
                                    className={location === item.link ? 'text-white card-title pb-0 pt-0' : 'card-title pb-0 pt-0'}>{item.title}
                                    {item.link === "/admin/message" ? <span className="m-2">{view==='0'?"":view}</span> : ""}
                                </span>

                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>

        </div>
    )
}