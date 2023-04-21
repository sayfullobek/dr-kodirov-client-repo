import React, {useEffect, useState} from "react";
import {workingService, embeddedGet} from "../../base/service/service";
import {deleteModal} from "../../base/DeleteModal";
import {Outlet} from "react-router";
import {PageTitle} from "../../component/adminComponent/PageTitle";
import {Pagination} from "../../component/adminComponent/Pagenation";
import {Loader} from "../../component/umumiyComponents/Loader";

export const Working = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(10)
    const [search, setSearch] = useState('')

    const getAll = async () => {
        try {
            await embeddedGet("working", setData, "embedded")
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

    const deleteWorking = async (e, id) => {
        await deleteModal(id, "working")
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
                                    title="working"/>
                                <button className='btn btn-primary' data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                    <i className='fas fa-plus-circle m-2'/>
                                    qo'shish
                                </button>
                                <CreateWorking getAll={getAll}/>
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
                                                        <WorkingList currentData={currentData}
                                                                     deleteWorking={deleteWorking}
                                                                     getAll={getAll}
                                                        />
                                                        <Pagination totalData={data.length} perPage={prePage}
                                                                    paginate={paginate}/>
                                                    </>
                                                ) : (
                                                    filter.length > 0 ? (
                                                        <>
                                                            <WorkingList currentData={filter}
                                                                         deleteWorking={deleteWorking}
                                                                         getAll={getAll}
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
                                                    working mavjud emas
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


const WorkingList = ({currentData, deleteWorking, getAll}) => {
    return (
        <table className="table text-center table-hover">
            <tbody>
            <tr className='text-primary'>
                <th>#</th>
                <th>uz</th>
                <th>en</th>
                <th>ru</th>
                <th colSpan={2}>malumotlar</th>
            </tr>
            {currentData.map((item, i) => (
                <tr key={i} className="fw-bold">
                    <td>{i + 1}</td>
                    <td>{item.nameUz}</td>
                    <td>{item.nameEn}</td>
                    <td>{item.nameRu}</td>
                    <td>
                        <div className='d-flex align-items-center justify-content-center'>
                            <button className='btn btn-primary text-white me-2' data-bs-toggle="offcanvas"
                                    data-bs-target={`#offcanvasRight${item.id}`} aria-controls="offcanvasRight">
                                <i className='fas fa-pen'/>
                            </button>
                            <UpdateWorking id={item.id} working={item} getAll={getAll}/>
                            <button className='btn btn-danger text-white' onClick={e => {
                                deleteWorking(e, item.id, item.nameUz)
                            }}>
                                <i className='fas fa-trash-alt'/>
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}


const CreateWorking = ({getAll}) => {
    const [nameUz, setUzName] = useState('')
    const [nameEn, setEnName] = useState('')
    const [nameRu, setRuName] = useState('')
    const [descriptionUz, setDescriptionUz] = useState('')
    const [descriptionEn, setDescriptionEn] = useState('')
    const [descriptionRu, setDescriptionRu] = useState('')
    const [img, setImg] = useState('')

    const createWorking = async (e) => {
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
        await workingService(data, undefined)
        getAll()
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight"
             aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasRightLabel" className='card-title'>
                    Working qo'shish
                </h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                <form autoComplete='off' onSubmit={createWorking}>
                    <div className='mb-3'>
                        <label htmlFor="nameUz"
                               className='card-title mb-0'>workingning O'zbekcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameUz" placeholder='Masalan: shirinliklar'
                               value={nameUz} onChange={e => setUzName(e.target.value)}/>

                        <label htmlFor="nameEn"
                               className='card-title mb-0'>workingning Inglizcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameEn" placeholder='For example: shirinliklar'
                               value={nameEn} onChange={e => setEnName(e.target.value)}/>

                        <label htmlFor="nameRu"
                               className='card-title mb-0'>workingning Ruscha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameRu" placeholder='Например: shirinliklar'
                               value={nameRu} onChange={e => setRuName(e.target.value)}/>

                        <label htmlFor="descriptionUz"
                               className='card-title mb-0'>workingning descriptionUz nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionUz"
                               placeholder='Например: descriptionUz'
                               value={descriptionUz} onChange={e => setDescriptionUz(e.target.value)}/>

                        <label htmlFor="descriptionEn"
                               className='card-title mb-0'>workingning descriptionEn nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionEn"
                               placeholder='Например: descriptionEn'
                               value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)}/>

                        <label htmlFor="descriptionRu"
                               className='card-title mb-0'>workingning descriptionRu nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionRu"
                               placeholder='Например: descriptionRu'
                               value={descriptionRu} onChange={e => setDescriptionRu(e.target.value)}/>

                        <label htmlFor="img"
                               className='card-title mb-0'>workingning img nomlanishini
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


const UpdateWorking = ({id, working, getAll}) => {
    const [nameUz, setUzName] = useState(working.nameUz)
    const [nameEn, setEnName] = useState(working.nameEn)
    const [nameRu, setRuName] = useState(working.nameRu)
    const [descriptionUz, setDescriptionUz] = useState(working.descriptionUz)
    const [descriptionEn, setDescriptionEn] = useState(working.descriptionEn)
    const [descriptionRu, setDescriptionRu] = useState(working.descriptionRu)
    const [img, setImg] = useState(working.img)

    const updateWorking = async (e) => {
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
        await workingService(data, id)
        getAll()
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id={`offcanvasRight${id}`}
             aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasRightLabel" className='card-title'>
                    Working qo'shish
                </h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                <form autoComplete='off' onSubmit={updateWorking}>
                    <div className='mb-3'>
                        <label htmlFor="nameUz"
                               className='card-title mb-0'>workingning O'zbekcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameUz" placeholder='Masalan: shirinliklar'
                               value={nameUz} onChange={e => setUzName(e.target.value)}/>

                        <label htmlFor="nameEn"
                               className='card-title mb-0'>workingning Inglizcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameEn" placeholder='For example: shirinliklar'
                               value={nameEn} onChange={e => setEnName(e.target.value)}/>

                        <label htmlFor="nameRu"
                               className='card-title mb-0'>workingning Ruscha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameRu" placeholder='Например: shirinliklar'
                               value={nameRu} onChange={e => setRuName(e.target.value)}/>

                        <label htmlFor="descriptionUz"
                               className='card-title mb-0'>workingning descriptionUz nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionUz"
                               placeholder='Например: descriptionUz'
                               value={descriptionUz} onChange={e => setDescriptionUz(e.target.value)}/>

                        <label htmlFor="descriptionEn"
                               className='card-title mb-0'>workingning descriptionEn nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionEn"
                               placeholder='Например: descriptionEn'
                               value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)}/>

                        <label htmlFor="descriptionRu"
                               className='card-title mb-0'>workingning descriptionRu nomlanishini
                        </label>
                        <textarea className="form-control" id="descriptionRu"
                               placeholder='Например: descriptionRu'
                               value={descriptionRu} onChange={e => setDescriptionRu(e.target.value)}/>

                        <label htmlFor="img"
                               className='card-title mb-0'>workingning img nomlanishini
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