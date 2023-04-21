import React, {useEffect, useState} from "react";
import {caruselService, embeddedGet} from "../../base/service/service";
import {deleteModal} from "../../base/DeleteModal";
import {Outlet} from "react-router";
import {PageTitle} from "../../component/adminComponent/PageTitle";
import {Pagination} from "../../component/adminComponent/Pagenation";
import {Loader} from "../../component/umumiyComponents/Loader";

export const Carusel = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(10)
    const [search, setSearch] = useState('')
    const ru = localStorage.getItem("ruLan")
    const en = localStorage.getItem("enLan")

    const getAll = async () => {
        try {
            await embeddedGet("carusel", setData, "embedded")
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

    const filter = data.filter(item => item.nameUz.toLowerCase().includes(search.toLowerCase()));

    const deleteCarusel = async (e, id) => {
        await deleteModal(id, "carusel")
        await getAll()
    }
    return (
        <>
            {loading ? (
                <div>
                    <Outlet/>

                    <div className="card">
                        <div className="card-header pb-0">
                            <div className='d-flex align-items-center justify-content-between'>
                                <PageTitle
                                    title="carusel"/>
                                <button className='btn btn-primary' data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                    <i className='fas fa-plus-circle m-2'/>
                                    qo'shish
                                </button>
                                <CreateCarusel getAll={getAll}/>
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
                                                        <CaruselList currentData={currentData}
                                                                     deleteCarusel={deleteCarusel}
                                                                     getAll={getAll} ru={ru} en={en}
                                                        />
                                                        <Pagination totalData={data.length} perPage={prePage}
                                                                    paginate={paginate}/>
                                                    </>
                                                ) : (
                                                    filter.length > 0 ? (
                                                        <>
                                                            <CaruselList currentData={filter}
                                                                         deleteCarusel={deleteCarusel}
                                                                         getAll={getAll} ru={ru} en={en}
                                                            />
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


const CaruselList = ({currentData, deleteCarusel, getAll, ru, en}) => {
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')

    const rasmboy = (m) => {
        setImg(m)
    }

    const info = (a) => {
        setDescription(a)
    }
    return (
        <>
            <table className="table text-center table-hover">
                <tbody>
                <tr className='text-primary'>
                    <th>#</th>
                    {ru === "true" ? (
                        <th>ru</th>
                    ) : en === "true" ? (
                        <th>en</th>
                    ) : (
                        <th>uz</th>
                    )}
                    <th>{ru === "true" ? "Информация" : en === "true" ? "info" : "malumot"}</th>
                    <th colSpan={2}>{ru === "true" ? "действие" : en === "true" ? "action" : "harakat"}</th>
                </tr>
                {currentData.map((item, i) => (
                    <tr key={i} className="fw-bold">
                        <td>{i + 1}</td>
                        {ru === "true" ? (
                            <td>{item.nameRu}</td>
                        ) : en === "true" ? (
                            <td>{item.nameEn}</td>
                        ) : (
                            <td>{item.nameUz}</td>
                        )}
                        <td>
                            <div className='d-flex align-items-center justify-content-center'>
                                <button type="button" className="btn btn-success me-2" data-toggle="modal"
                                        onClick={() => rasmboy(item.img)}
                                        data-target="#exampleModal"><i className="bi bi-eye-fill"/></button>
                                <button type="button" className="btn btn-warning me-2" data-toggle="modal"
                                        onClick={() => info(ru === "true" ? item.descriptionRu : en === "true" ? item.descriptionEn : item.descriptionUz)}
                                        data-target="#exampleModal1"><i className="bi bi-info-square-fill text-light"/>
                                </button>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center justify-content-center'>
                                <button className='btn btn-primary text-white me-2' data-bs-toggle="offcanvas"
                                        data-bs-target={`#offcanvasRight${item.id}`} aria-controls="offcanvasRight">
                                    <i className='fas fa-pen'/>
                                </button>
                                <UpdateCarusel id={item.id} carusel={item} getAll={getAll}/>
                                <button className='btn btn-danger text-white' onClick={e => {
                                    deleteCarusel(e, item.id, item.nameUz)
                                }}>
                                    <i className='fas fa-trash-alt'/>
                                </button>
                            </div>
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
                            <h5 className="modal-title" id="exampleModalLabel">
                                {ru === "true" ? "картина" : en === "true" ? "picture" : "rasm"}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body w-100">
                            <div className="col-12 d-flex align-items-center justify-content-center">
                                <img src={img} className="col-12" alt="rasm mavjud emas"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                                    data-dismiss="modal">{ru === "true" ? "закрывать" : en === "true" ? "close" : "yopish"}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {ru === "true" ? "Информация" : en === "true" ? "info" : "malumot"}
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body w-100">
                            <div className="col-12 d-flex align-items-center justify-content-center">
                                <h6>{description}</h6>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                                    data-dismiss="modal">{ru === "true" ? "закрывать" : en === "true" ? "close" : "yopish"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const CreateCarusel = ({getAll}) => {
    const [nameUz, setUzName] = useState('')
    const [nameEn, setEnName] = useState('')
    const [nameRu, setRuName] = useState('')
    const [descriptionUz, setDescriptionUz] = useState('')
    const [descriptionEn, setDescriptionEn] = useState('')
    const [descriptionRu, setDescriptionRu] = useState('')
    const [img, setImg] = useState('')

    const createCarusel = async (e) => {
        e.preventDefault()
        const data = {
            nameUz,
            nameEn,
            nameRu,
            descriptionUz,
            descriptionEn,
            descriptionRu,
            img,
        }
        await caruselService(data, undefined)
        getAll()
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight"
             aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasRightLabel" className='card-title'>
                    Carusel qo'shish
                </h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                <form autoComplete='off' onSubmit={createCarusel}>
                    <div className='mb-3'>
                        <label htmlFor="nameUz"
                               className='card-title mb-0'>caruselning O'zbekcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameUz" placeholder='Masalan: shirinliklar'
                               value={nameUz} onChange={e => setUzName(e.target.value)}/>

                        <label htmlFor="nameEn"
                               className='card-title mb-0'>caruselning Inglizcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameEn" placeholder='For example: shirinliklar'
                               value={nameEn} onChange={e => setEnName(e.target.value)}/>

                        <label htmlFor="nameRu"
                               className='card-title mb-0'>caruselning Ruscha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameRu" placeholder='Например: shirinliklar'
                               value={nameRu} onChange={e => setRuName(e.target.value)}/>

                        <label htmlFor="descriptionUz"
                               className='card-title mb-0'>caruselning descriptionUz nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionUz"
                                  placeholder='Например: descriptionUz'
                                  value={descriptionUz} onChange={e => setDescriptionUz(e.target.value)}/>

                        <label htmlFor="descriptionEn"
                               className='card-title mb-0'>caruselning descriptionEn nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionEn"
                                  placeholder='Например: descriptionEn'
                                  value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)}/>

                        <label htmlFor="descriptionRu"
                               className='card-title mb-0'>caruselning descriptionRu nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionRu"
                                  placeholder='Например: descriptionRu'
                                  value={descriptionRu} onChange={e => setDescriptionRu(e.target.value)}/>

                        <label htmlFor="img"
                               className='card-title mb-0'>caruselning img nomlanishini
                        </label>
                        <input type="text" className="form-control" id="img" placeholder='Например: img'
                               value={img} onChange={e => setImg(e.target.value)}/>
                    </div>
                    <button className='btn btn-success d-block'>
                        <i className='fas fa-plus-circle me-2'/>
                        Qo'shish
                    </button>
                </form>
            </div>
        </div>
    )
}


const UpdateCarusel = ({id, carusel, getAll}) => {
    const [nameUz, setUzName] = useState(carusel.nameUz)
    const [nameEn, setEnName] = useState(carusel.nameEn)
    const [nameRu, setRuName] = useState(carusel.nameRu)
    const [descriptionUz, setDescriptionUz] = useState(carusel.descriptionUz)
    const [descriptionEn, setDescriptionEn] = useState(carusel.descriptionEn)
    const [descriptionRu, setDescriptionRu] = useState(carusel.descriptionRu)
    const [img, setImg] = useState(carusel.img)

    const updateCarusel = async (e) => {
        e.preventDefault()
        const data = {
            nameUz,
            nameEn,
            nameRu,
            descriptionUz,
            descriptionEn,
            descriptionRu,
            img,
        }
        await caruselService(data, id)
        getAll()
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id={`offcanvasRight${id}`}
             aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasRightLabel" className='card-title'>
                    Carusel qo'shish
                </h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                <form autoComplete='off' onSubmit={updateCarusel}>
                    <div className='mb-3'>
                        <label htmlFor="nameUz"
                               className='card-title mb-0'>caruselning O'zbekcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameUz" placeholder='Masalan: shirinliklar'
                               value={nameUz} onChange={e => setUzName(e.target.value)}/>

                        <label htmlFor="nameEn"
                               className='card-title mb-0'>caruselning Inglizcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameEn" placeholder='For example: shirinliklar'
                               value={nameEn} onChange={e => setEnName(e.target.value)}/>

                        <label htmlFor="nameRu"
                               className='card-title mb-0'>caruselning Ruscha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameRu" placeholder='Например: shirinliklar'
                               value={nameRu} onChange={e => setRuName(e.target.value)}/>

                        <label htmlFor="descriptionUz"
                               className='card-title mb-0'>caruselning descriptionUz nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionUz"
                                  placeholder='Например: descriptionUz'
                                  value={descriptionUz} onChange={e => setDescriptionUz(e.target.value)}/>

                        <label htmlFor="descriptionEn"
                               className='card-title mb-0'>caruselning descriptionEn nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionEn"
                                  placeholder='Например: descriptionEn'
                                  value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)}/>

                        <label htmlFor="descriptionRu"
                               className='card-title mb-0'>caruselning descriptionRu nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionRu"
                                  placeholder='Например: descriptionRu'
                                  value={descriptionRu} onChange={e => setDescriptionRu(e.target.value)}/>

                        <label htmlFor="img"
                               className='card-title mb-0'>caruselning img nomlanishini
                        </label>
                        <input type="text" className="form-control" id="img" placeholder='Например: img'
                               value={img} onChange={e => setImg(e.target.value)}/>
                    </div>
                    <button className='btn btn-success d-block'>
                        <i className='fas fa-save me-2'/>
                        Saqlash
                    </button>
                </form>
            </div>
        </div>
    )
}