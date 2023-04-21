import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {embeddedGet, sendMessage} from "../../base/service/service";
import {MDBIcon} from "mdb-react-ui-kit";

export const SendMessage = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const [tarmoqlar, setTarmoqlar] = useState([])

    const getTarmoqlar = async () => {
        try {
            await embeddedGet("tarmoqlar", setTarmoqlar, "embedded")
        } catch (err) {
        }
    }

    useEffect(() => {
        getTarmoqlar()
    }, [])

    const sendMsg = async (e) => {
        e.preventDefault()
        const data = {
            name,
            phoneNumber,
            message
        }
        await sendMessage("message", data, navigate)
    }

    return (
        <div className="col-12 d-flex align-items-center justify-content-center" style={{height: '70vh'}}>
            <form className="col-10 col-md-4 col-sm-8" onSubmit={sendMsg}>
                <div className="form-outline mb-4">
                    <input type="text" id="form4Example1" value={name} onChange={e => setName(e.target.value)}
                           className="form-control border"/>
                    <label className="form-label" for="form4Example1">Name</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="number" id="form4Example2" value={phoneNumber}
                           onChange={e => setPhoneNumber(e.target.value)} className="form-control border"/>
                    <label className="form-label" for="form4Example2">tel raqam masalan :
                        990763246</label>
                </div>

                <div className="form-outline mb-4">
                    <textarea className="form-control border" value={message} onChange={e => setMessage(e.target.value)}
                              id="form4Example3" rows="4"/>
                    <label className="form-label" for="form4Example3">Message</label>
                </div>

                <button type="submit" className="btn btn-success btn-block mb-4">Send</button>
                <div className="text-center">
                    <p>home <Link to={"/"}>Home</Link></p>
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