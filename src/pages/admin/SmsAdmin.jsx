import React, {useEffect, useState} from "react";
import {Outlet} from "react-router";
import {PageTitle} from "../../component/adminComponent/PageTitle";
import {Pagination} from "../../component/adminComponent/Pagenation";
import {Loader} from "../../component/umumiyComponents/Loader";
import {embeddedGet} from "../../base/service/service";
import {deleteModal} from "../../base/DeleteModal";
import {Button, Modal} from "bootstrap";

export const SmsAdmin = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(10)
    const [search, setSearch] = useState('')

    const getAll = async () => {
        try {
            await embeddedGet("message", setData, "embedded")
            setLoading(true)
        } catch (err) {
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    const indexOfLastData = currentPage * prePage;
    const indexOfFirstData = indexOfLastData - prePage;
    const currentData = data.slice(indexOfFirstData, indexOfLastData);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filter = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            {loading ? (
                <div>
                    <Outlet/>

                    <div className="card">
                        <div className="card-header pb-0">
                            <div className='d-flex align-items-center justify-content-between'>
                                <PageTitle
                                    title="message"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <input type="text"
                                           placeholder='Qidirish...'
                                           className='form-control'
                                           value={search} onChange={e => setSearch(e.target.value)}/>
                                </div>
                                <div className="card-body">
                                    <div className="table-reponsive">
                                        {data.length > 0 ? (
                                            <>
                                                {search.length === 0 ? (
                                                    <>
                                                        <CaruselList currentData={currentData}/>
                                                        <Pagination totalData={data.length} perPage={prePage}
                                                                    paginate={paginate}/>
                                                    </>
                                                ) : (
                                                    filter.length > 0 ? (
                                                        <>
                                                            <CaruselList currentData={filter}/>
                                                        </>
                                                    ) : (
                                                        <div className='text-center'>
                                                            <h3 className='card-title'>
                                                                <i className='fas fa-exclamation-circle me-2'/>
                                                                Qidiruv natijasida ma'lumot topilmadi
                                                            </h3>
                                                        </div>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            <div className='text-center'>
                                                <h3 className='card-title'>
                                                    <i className='fas fa-exclamation-circle me-2'/>
                                                    carusel mavjud emas
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader/>
            )}
        </>
    )
}


const CaruselList = ({currentData}) => {
    const [mes, setMes] = useState('')

    const message = (m)=>{
        setMes(m)
    }

    return (
        <>
            <table className="table text-center table-hover">
                <tbody>
                <tr className='text-primary'>
                    <th>#</th>
                    <th>name</th>
                    <th>phoneNumber</th>
                    <th>message</th>
                </tr>
                {currentData.map((item, i) => (
                    <tr key={i} className="fw-bold">
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.phoneNumber}</td>
                        <td>
                            <button type="button" className="btn btn-primary" data-toggle="modal" onClick={()=>message(item.message)}
                                    data-target="#exampleModal">
                                smsni korish
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                {mes}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
