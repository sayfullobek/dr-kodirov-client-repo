import {baseConfig as baseConfigurer, baseConfig} from '../baseConfig'
import {toast} from "react-toastify";

export const caruselService = async (data, id) => {
    if (data !== undefined) {
        const check = {
            nameUz: data.nameUz.trim().length === 0,
            nameEn: data.nameEn.trim().length === 0,
            nameRu: data.nameRu.trim().length === 0,
            descriptionUz: data.descriptionUz.trim().length === 0,
            descriptionEn: data.descriptionEn.trim().length === 0,
            descriptionRu: data.descriptionRu.trim().length === 0,
            img: data.img.trim().length === 0
        }
        if (check.nameUz || check.nameEn || check.nameRu || check.descriptionUz || check.descriptionEn || check.descriptionRu || check.img) {
            return toast.error("malumotlar bo'sh bo'lmasligi kerak")
        }
    }
    try {
        if (id === "" || id === null || id === undefined || id === "undefined") {
            await baseConfig.doPost("carusel", data)
            toast.success("carusel saqlandi")
        } else {
            await baseConfig.doPut(id, "carusel", data)
            toast.success("carusel tahrirlandi")
        }
        if (data) {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        if (err.response.status === 409) {
            toast.error("bunday malumot mavjud")
        } else {
            toast.error("xatolik")
        }
    }
}


export const workingService = async (data, id) => {
    if (data !== undefined) {
        const check = {
            nameUz: data.nameUz.trim().length === 0,
            nameEn: data.nameEn.trim().length === 0,
            nameRu: data.nameRu.trim().length === 0,
            descriptionUz: data.descriptionUz.trim().length === 0,
            descriptionEn: data.descriptionEn.trim().length === 0,
            descriptionRu: data.descriptionRu.trim().length === 0,
            img: data.img.trim().length === 0
        }
        if (check.nameUz || check.nameEn || check.nameRu || check.descriptionUz || check.descriptionEn || check.descriptionRu || check.img) {
            return toast.error("malumotlar bo'sh bo'lmasligi kerak")
        }
    }
    try {
        if (id === "" || id === null || id === undefined || id === "undefined") {
            await baseConfig.doPost("working", data)
            toast.success("working saqlandi")
        } else {
            await baseConfig.doPut(id, "working", data)
            toast.success("working tahrirlandi")
        }
        if (data) {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        if (err.response.status === 409) {
            toast.error("bunday malumot mavjud")
        } else {
            toast.error("xatolik")
        }
    }
}

export const videosService = async (data, id) => {
    if (data !== undefined) {
        const check = {
            nameUz: data.nameUz.trim().length === 0,
            nameEn: data.nameEn.trim().length === 0,
            nameRu: data.nameRu.trim().length === 0,
            videos: data.videos.trim().length === 0,
            img: data.img.trim().length === 0
        }
        if (check.nameUz || check.nameEn || check.nameRu || check.videos || check.img) {
            return toast.error("malumotlar bo'sh bo'lmasligi kerak")
        }
    }
    try {
        if (id === "" || id === null || id === undefined || id === "undefined") {
            await baseConfig.doPost("videos", data)
            toast.success("videos saqlandi")
        } else {
            await baseConfig.doPut(id, "videos", data)
            toast.success("videos tahrirlandi")
        }
        if (data) {
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        if (err.response.status === 409) {
            toast.error("bunday malumot mavjud")
        } else {
            toast.error("xatolik")
        }
    }
}

export const sendMessage = async (url, data, navigate) => {
    const check = {
        name: data.name.trim().length === 0,
        message: data.message.trim().length === 0
    }
    if (check.name || check.message) {
        return toast.error("malumotlar bo'sh bo'lmasligi kerak")
    }
    if ((data.phoneNumber.length !== 9)) {
        return toast.error("telefon raqamingizni to'g'ri kiriting")
    }
    try {
        await baseConfig.doPost(url, data)
        toast.success("malumot yuborildi")
        setTimeout(() => {
            navigate("/")
            window.location.reload()
            const a = parseInt(localStorage.getItem("view")) + 1
            localStorage.setItem("view", a)
        }, 2000)
    } catch (err) {
        toast.error("xatolik")
    }
}

export const contactService = async (id, url, data) => {
    if (data !== undefined) {
        const check = {
            address: data.address.trim().length === 0,
            email: data.email.trim().length === 0,
            phoneNumber: data.phoneNumber.trim().length === 0,
            workAddress: data.workAddress.trim().length === 0,
        }
        if (check.address || check.email || check.phoneNumber || check.workAddress) {
            return toast.error("malumotlar bo'sh bo'lmasligi kerak")
        }
    }
    try {
        const res = await baseConfig.doPut(id, url, data)
        if (res.status === 200) {
            toast.success("tahrirlandi")
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        toast.error("xatolik")
    }
}


export const tarmoqlarService = async (id, url, data) => {
    if (data !== undefined) {
        const check = {
            instagram: data.instagram.trim().length === 0,
            telegram: data.telegram.trim().length === 0,
            watsapp: data.watsapp.trim().length === 0,
            facebook: data.facebook.trim().length === 0,
            google: data.google.trim().length === 0,
            youtube: data.youtube.trim().length === 0,
        }
        if (check.instagram || check.telegram || check.watsapp || check.facebook || check.google || check.youtube) {
            return toast.error("malumotlar bo'sh bo'lmasligi kerak")
        }
    }
    try {
        const res = await baseConfig.doPut(id, url, data)
        if (res.status === 200) {
            toast.success("tahrirlandi")
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        toast.error("xatolik")
    }
}

export const embeddedGet = async (url, setData, status) => {
    try {
        if (status === "data") {
            const res = await baseConfigurer.doGet(url)
            setData(res.data)
        } else if (status === "embedded") {
            const res = await baseConfigurer.doGet(url)
            setData(res.data._embedded.list)
        }
    } catch (err) {
    }
}


export const deleteService = async (id, status) => {
    try {
        await baseConfigurer.doDelete(id, status)
        toast.success("malumot o'chirlidi")
    } catch (err) {
        toast.error("xatolik")
    }
}