import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Input} from 'reactstrap';
import {useNavigate} from "react-router-dom"
import {login} from '../../base/service/authService'
import {isAuthenticated} from '../../handlers/auth'
import {MDBIcon} from "mdb-react-ui-kit";
import {embeddedGet} from "../../base/service/service";


export const Login = () => {

    const navigate = useNavigate()
    const [tarmoqlar, setTarmoqlar] = useState([])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const getTarmoqlar = async () => {
        try {
            await embeddedGet("tarmoqlar", setTarmoqlar, "embedded")
        } catch (err) {
        }
    }

    useEffect(() => {
        getTarmoqlar()
    }, [])

    useEffect(() => {
        const redirectAdminPanel = () => {
            const token = localStorage.getItem('token');
            const isAuth = isAuthenticated(token)
            if (isAuth) return navigate('/admin')
        }
        redirectAdminPanel()
    }, [])

    const loginHandler = async (e) => {
        e.preventDefault()

        const data = {
            phoneNumber,
            password
        }
        await login(data)
    }

    return (
        <div className="col-12 d-flex align-items-center justify-content-center" style={{height: '70vh'}}>
            <form className="col-10 col-md-4 col-sm-8" onSubmit={loginHandler}>
                <div className="mb-4">
                    <label className="form-label" for="form2Example1">Phone number</label>
                    <Input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                           id="form2Example1" placeholder="Enter your phone number" className="form-control"/>
                </div>

                <div className="mb-4">
                    <label className="form-label" for="form2Example2">Password</label>
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)}
                           id="form2Example2" placeholder="Enter your password" className="form-control"/>
                </div>

                <button type="submit" className="btn btn-success btn-block mb-4">Sign in</button>

                <div className="text-center">
                    <p>Not a member? <Link to={"/auth/login/send"}>send message</Link> home <Link to={"/"}>Home</Link>
                    </p>
                    <p>or sign up with:</p>
                    {tarmoqlar.map(item => (
                        <div>
                            <a href={item.instagram} className='btn btn-success m-1 m-1'>
                                <MDBIcon fab icon="instagram"/>
                            </a>
                            <a href={item.telegram} className='btn btn-success m-1'>
                                <MDBIcon fab icon="telegram"/>
                            </a>
                            <a href={item.watsapp} className='btn btn-success m-1'>
                                <i className="fa-brands fa-whatsapp"/>
                            </a>
                            <a href={item.facebook} className='btn btn-success m-1'>
                                <MDBIcon fab icon="facebook-f"/>
                            </a>
                            <a href={item.google} className='btn btn-success m-1'>
                                <MDBIcon fab icon="google"/>
                            </a>
                            <a href={item.youtube} className='btn btn-success m-1'>
                                <MDBIcon fab icon="youtube"/>
                            </a>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
}