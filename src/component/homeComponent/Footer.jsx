import React, {useEffect, useState} from 'react';
import {MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon} from 'mdb-react-ui-kit';
import {FooterLinksPages, MiniPagesFooter} from "../../other/FooterLinks"
import {Link} from 'react-router-dom'
import {contactService, embeddedGet, tarmoqlarService} from "../../base/service/service";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export const Footer = () => {
    const ru = localStorage.getItem("ruLan")
    const en = localStorage.getItem("enLan")
    const [contact, setContact] = useState([])
    const [tarmoqlar, setTarmoqlar] = useState([])
    const role = localStorage.getItem("role")
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [workAddress, setWorkAddress] = useState('')
    const [contactId, setContactId] = useState('')
    const [malumotlarim, setMalumotlarim] = useState('')
    const [showModal, setShowmodal] = useState(false)

    const [instagram, setInstagram] = useState('')
    const [telegram, setTelegram] = useState('')
    const [watsapp, setWatsapp] = useState('')
    const [facebook, setFacebook] = useState('')
    const [google, setGoogle] = useState('')
    const [youtube, setYoutube] = useState('')
    const [tarmoqId, setTarmoqId] = useState('')


    const openModal = (id) => {
        setTarmoqId(id)
        setShowmodal(!showModal)
    }

    const seeId = (id) => {
        setContactId(id)
    }

    const editTarmoqlar = async (e) => {
        e.preventDefault()

        const data = {
            instagram,
            telegram,
            watsapp,
            facebook,
            google,
            youtube
        }
        await tarmoqlarService(tarmoqId, "tarmoqlar", data)
    }

    const editContact = async (e) => {
        e.preventDefault()
        const data = {
            address,
            email,
            phoneNumber,
            workAddress,
            malumotlarim
        }
        await contactService(contactId, "contact", data)
    }

    const getContact = async () => {
        try {
            await embeddedGet("contact", setContact, "embedded")
            await embeddedGet("tarmoqlar", setTarmoqlar, "embedded")
        } catch (err) {
        }
    }

    useEffect(() => {
        getContact()
    }, [])

    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    {/*<span>Get connected with us on social networks:</span>*/}
                </div>

                {tarmoqlar.map(item => (
                    <div>
                        <div className="m-4">
                            {role === "Admin" ? (
                                <button className="btn btn-primary" style={{margin: '0 30px'}}
                                        onClick={() => openModal(item.id)}>tahrirlash</button>
                            ) : ("")}
                        </div>
                        <a href={item.instagram} className='me-4 text-reset'>
                            <MDBIcon fab icon="instagram"/>
                        </a>
                        <a href={item.telegram} className='me-4 text-reset'>
                            <MDBIcon fab icon="telegram"/>
                        </a>
                        <a href={item.watsapp} className='me-4 text-reset'>
                            <i className="fa-brands fa-whatsapp"/>
                        </a>
                        <a href={item.facebook} className='me-4 text-reset'>
                            <MDBIcon fab icon="facebook-f"/>
                        </a>
                        <a href={item.google} className='me-4 text-reset'>
                            <MDBIcon fab icon="google"/>
                        </a>
                        <a href={item.youtube} className='me-4 text-reset'>
                            <MDBIcon fab icon="youtube"/>
                        </a>
                    </div>
                ))}
            </section>

            <section className='p-2 text-light bg-success'>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                {ru === "true" ? "моя информация" : en === "true" ? "my information" : "malumotlarim"}
                            </h6>
                            {contact.map(item => (
                                <p>
                                    {item.malumotlarim}
                                </p>
                            ))}
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>{ru === "true" ? "способы связи" : en === "true" ? "ways of communication" : "bog'lanish yo'llari"}</h6>
                            {FooterLinksPages.map(item => (
                                <p>
                                    <Link to={item.pages} className='text-reset'>
                                        {item.name}
                                    </Link>
                                </p>
                            ))}
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>{ru === "true" ? "Новости" : en === "true" ? "news" : "yangiliklar"}</h6>
                            {MiniPagesFooter.map(item => (
                                <p>
                                    <Link to={item.pages} className='text-reset'>
                                        {item.name}
                                    </Link>
                                </p>
                            ))}
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            {contact.map(item => (
                                <>
                                    <h6 className='text-uppercase fw-bold mb-4'>{ru === "true" ? "контакт" : en === "true" ? "contact" : "aloqa"}</h6>
                                    <p>
                                        <MDBIcon icon="home" className="me-2"/>
                                        {item.address}
                                    </p>
                                    <p>
                                        <MDBIcon icon="envelope" className="me-3"/>
                                        {item.email}
                                    </p>
                                    <p>
                                        <MDBIcon icon="phone" className="me-3"/>
                                        {item.phoneNumber}
                                    </p>
                                    <p>
                                        <MDBIcon icon="print" className="me-3"/>
                                        {item.workAddress}
                                    </p>
                                    {role === "Admin" ?
                                        <>
                                            <button type="button" className="btn btn-primary" data-toggle="modal"
                                                    data-target="#exampleModal" onClick={() => seeId(item.id)}>
                                                malumotlarni tahrirlash
                                            </button>
                                        </>
                                        :
                                        ""
                                    }
                                </>
                            ))}
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                © 2022 : <Link to={"/"} className='text-reset fw-bold'>
                Dr.Kodirov
            </Link>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">contactni tahrirlash</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editContact}>
                                <label htmlFor="address"
                                       className='card-title mb-0'>addressingizni kiriting
                                </label>
                                <input type="text" className="form-control" id="address" placeholder='Masalan: toshkent'
                                       value={address} onChange={e => setAddress(e.target.value)}/>

                                <label htmlFor="email"
                                       className='card-title mb-0'>emailingizni kiriting
                                </label>
                                <input type="text" className="form-control" id="email"
                                       placeholder='Masalan: ketmon@gmail.com'
                                       value={email} onChange={e => setEmail(e.target.value)}/>

                                <label htmlFor="phoneNumber"
                                       className='card-title mb-0'>telefon raqamingizni kiriting
                                </label>
                                <input type="text" className="form-control" id="phoneNumber"
                                       placeholder='Masalan: +998990763246'
                                       value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>

                                <label htmlFor="workAddress"
                                       className='card-title mb-0'>ish honangizni telefon raqamini kiriting
                                </label>
                                <input type="text" className="form-control" id="workAddress"
                                       placeholder='Masalan: +998991231212'
                                       value={workAddress} onChange={e => setWorkAddress(e.target.value)}/>

                                <label htmlFor="malumot"
                                       className='card-title mb-0'>malumotingizni kiriting
                                </label>
                                <textarea className="form-control" id="malumot" placeholder='Masalan: salom men...'
                                          value={malumotlarim} onChange={e => setMalumotlarim(e.target.value)}/>

                                <div className="modal-footer">
                                    <button className="btn btn-primary">save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <Modal isOpen={showModal}>
                <ModalHeader>
                    tarmoqlar
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={editTarmoqlar}>
                        <label htmlFor="phoneNumber"
                               className='card-title mb-0'>instagramni kiriting
                        </label>
                        <input type="text" className="form-control" id="instagram"
                               placeholder='Masalan: +998990763246'
                               value={instagram} onChange={e => setInstagram(e.target.value)}/>

                        <label htmlFor="telegram"
                               className='card-title mb-0'>telegramni kiriting
                        </label>
                        <input type="text" className="form-control" id="telegram"
                               placeholder='Masalan: +998990763246'
                               value={telegram} onChange={e => setTelegram(e.target.value)}/>

                        <label htmlFor="phoneNumber"
                               className='card-title mb-0'>watsappni kiriting
                        </label>
                        <input type="text" className="form-control" id="watsapp"
                               placeholder='Masalan: +998990763246'
                               value={watsapp} onChange={e => setWatsapp(e.target.value)}/>

                        <label htmlFor="facebook"
                               className='card-title mb-0'>telefon raqamingizni kiriting
                        </label>
                        <input type="text" className="form-control" id="facebook"
                               placeholder='Masalan: +998990763246'
                               value={facebook} onChange={e => setFacebook(e.target.value)}/>

                        <label htmlFor="google"
                               className='card-title mb-0'>googleni kiriting
                        </label>
                        <input type="text" className="form-control" id="google"
                               placeholder='Masalan: +998990763246'
                               value={google} onChange={e => setGoogle(e.target.value)}/>

                        <label htmlFor="youtube"
                               className='card-title mb-0'>youtube kiriting
                        </label>
                        <input type="text" className="form-control" id="youtube"
                               placeholder='Masalan: +998990763246'
                               value={youtube} onChange={e => setYoutube(e.target.value)}/>
                        <ModalFooter>
                            <Button color="danger" onClick={openModal}>close</Button>
                            <Button color="primary">Save</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        </MDBFooter>
    );
}