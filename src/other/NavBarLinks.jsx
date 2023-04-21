import React from "react";

const ru = localStorage.getItem("ruLan")
const en = localStorage.getItem("enLan")
export const NavBarLinks = [
    {
        name: ru === "true" ? "меню" : en === "true" ? "Home" : "menyu",
        page: "/"
    },
    {
        name: ru === "true" ? "моя информация" : en === "true" ? "моя информация" : "malumotlarim",
        page: "/malumotlar"
    },
    {
        name: localStorage.getItem("role") === "Admin" ? ru === "true" ? "доступ к платформе" : en === "true" ? "access to the platform" : "platformaga kirish" : ru === "true" ? "авторизоваться" : en === "true" ? "login" : "kirish",
        page: "/auth/login"
    },
    {
        name: ru === "true" ? "послать сообщение" : en === "true" ? "send a message" : "xabar yuborish",
        page: "/auth/login/send"
    }
]