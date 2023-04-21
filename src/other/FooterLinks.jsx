import React from 'react';

const ru = localStorage.getItem("ruLan")
const en = localStorage.getItem("enLan")

export const FooterLinksPages = [
    {
        name: ru === "true" ? "доступ" : en === "true" ? "login" : "kirish",
        pages: "/auth/login"
    },
    {
        name: ru === "true" ? "послать сообщение" : en === "true" ? "send a message" : "xabar yuborish",
        pages: "/auth/login/send"
    },
]

export const MiniPagesFooter = [
    {
        name: ru === "true" ? "меню" : en === "true" ? "home" : "menyu",
        pages: "/"
    },
    {
        name: ru === "true" ? "моя информация" : en === "true" ? "my information" : "malumotlarim",
        pages: "/malsumotlar"
    },
]