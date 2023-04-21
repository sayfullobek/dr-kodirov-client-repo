import React, {useEffect, useState} from 'react';
import {Cards} from "../../component/adminComponent/Cards";
import {embeddedGet} from "../../base/service/service";

export const Admin = () => {
    const [malumotlar, setMalumotlar] = useState([])
    const [sms, setSms] = useState([])
    const [work, setWork] = useState([])
    const [videos, setVideos] = useState([])

    const getAll = async () => {
        try {
            await embeddedGet("carusel", setMalumotlar, "embedded")
            await embeddedGet("message", setSms, "embedded")
            await embeddedGet("working", setWork, "embedded")
            await embeddedGet("videos", setVideos, "embedded")
        } catch (err) {
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <div className="row">
            <Cards title={"malumotlarim"} size={"malumotlarning soni " + malumotlar.length}
                   description={"malumotlarimning son yuqorida ko'rsatilgan"} link={"/admin/carusel"}/>

            <Cards title={"xabarlar"} size={"xabarlarlarning soni " + sms.length}
                   description={"xabarlarlarning son yuqorida ko'rsatilgan"} link={"/admin/message"}/>

            <Cards title={"qilgan ishlarim"} size={"qilgan ishlarimning soni " + work.length}
                   description={"qilgan ishlarimlarning son yuqorida ko'rsatilgan"} link={"/admin/working"}/>

            <Cards title={"videolarim"} size={"videolarimning soni " + videos.length}
                   description={"videolarimning son yuqorida ko'rsatilgan"} link={"/admin/videos"}/>
        </div>
    )
}