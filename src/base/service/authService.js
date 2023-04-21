import {toast} from 'react-toastify';
import {baseConfig} from '../baseConfig'

export const login = async (data) => {
    const check = {
        phoneNumber: data.phoneNumber.trim().length === 0,
        password: data.password.trim().length === 0
    }
    if (check.phoneNumber || check.password) {
        return toast.warning("malumot kirgizing")
    }

    try {
        const res = await baseConfig.doPost("auth/login", data)
        if (res.status === 200) {
            const roles = res.data.user.roles.length > 1 ? "Admin" : res.data.user.roles.length > 0 ? "User" : ""
            localStorage.setItem('token', res.data.resToken.body)
            localStorage.setItem('tokenType', res.data.resToken.tokenType)
            localStorage.setItem('firstName', res.data.user.firstName)
            localStorage.setItem('lastName', res.data.user.lastName)
            localStorage.setItem('role', roles)
            localStorage.setItem('realPassword', res.data.user.password)
            localStorage.setItem('pre', res.data.user.prePassword)
            localStorage.setItem('id', res.data.user.id)
            localStorage.setItem("view", '0')
            toast.success("kuting...")
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    } catch (err) {
        if (err.response === undefined) {
            return toast.error("internetga ulaning oka")
        }
    }
}