import React, {useEffect, useState} from "react";
import {embeddedGet, videosService} from "../../base/service/service";
import {deleteModal} from "../../base/DeleteModal";
import {Outlet} from "react-router";
import {PageTitle} from "../../component/adminComponent/PageTitle";
import {Pagination} from "../../component/adminComponent/Pagenation";
import {Loader} from "../../component/umumiyComponents/Loader";

export const Videos = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [prePage] = useState(10)
    const [search, setSearch] = useState('')

    const getAll = async () => {
        try {
            await embeddedGet("videos", setData, "embedded")
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

    const deleteVideos = async (e, id) => {
        await deleteModal(id, "videos")
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
                                    title="videos"/>
                                <button className='btn btn-primary' data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                    <i className='fas fa-plus-circle m-2'/>
                                    qo'shish
                                </button>
                                <CreateVideos getAll={getAll}/>
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
                                                        <VideosList currentData={currentData}
                                                                     deleteVideos={deleteVideos}
                                                                     getAll={getAll}
                                                        />
                                                        <Pagination totalData={data.length} perPage={prePage}
                                                                    paginate={paginate}/>
                                                    </>
                                                ) : (
                                                    filter.length > 0 ? (
                                                        <>
                                                            <VideosList currentData={filter}
                                                                         deleteVideos={deleteVideos}
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
                                                    videos mavjud emas
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


const VideosList = ({currentData, deleteVideos, getAll}) => {
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
                            <UpdateVideos id={item.id} video={item} getAll={getAll}/>
                            <button className='btn btn-danger text-white' onClick={e => {
                                deleteVideos(e, item.id, item.nameUz)
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


const CreateVideos = ({getAll}) => {
    const [nameUz, setUzName] = useState('')
    const [nameEn, setEnName] = useState('')
    const [nameRu, setRuName] = useState('')
    const [videos, setVideos] = useState('')
    const [img, setImg] = useState('')

    const createVideos = async (e) => {
        e.preventDefault()
        const data = {
            nameUz,
            nameEn,
            nameRu,
            videos,
            img
        }
        await videosService(data, undefined)
        getAll()
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight"
             aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasRightLabel" className='card-title'>
                    Videos qo'shish
                </h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                <form autoComplete='off' onSubmit={createVideos}>
                    <div className='mb-3'>
                        <label htmlFor="nameUz"
                               className='card-title mb-0'>videosning O'zbekcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameUz" placeholder='Masalan: shirinliklar'
                               value={nameUz} onChange={e => setUzName(e.target.value)}/>

                        <label htmlFor="nameEn"
                               className='card-title mb-0'>videosning Inglizcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameEn" placeholder='For example: shirinliklar'
                               value={nameEn} onChange={e => setEnName(e.target.value)}/>

                        <label htmlFor="nameRu"
                               className='card-title mb-0'>videosning Ruscha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameRu" placeholder='Например: shirinliklar'
                               value={nameRu} onChange={e => setRuName(e.target.value)}/>

                        <label htmlFor="videos"
                               className='card-title mb-0'>videosning videos nomlanishini
                        </label>
                        <input type="text" className="form-control" id="videos" placeholder='Например: videos'
                               value={videos} onChange={e => setVideos(e.target.value)}/>

                        <label htmlFor="img"
                               className='card-title mb-0'>imgning nomlanishini
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


const UpdateVideos = ({id, video, getAll}) => {
    const [nameUz, setUzName] = useState(video.nameUz)
    const [nameEn, setEnName] = useState(video.nameEn)
    const [nameRu, setRuName] = useState(video.nameRu)
    const [videos, setVideos] = useState(video.videos)
    const [img, setImg] = useState(video.videos)

    const updateVideos = async (e) => {
        e.preventDefault()
        const data = {
            nameUz,
            nameEn,
            nameRu,
            videos,
            img
        }
        await videosService(data, id)
        getAll()
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id={`offcanvasRight${id}`}
             aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h4 id="offcanvasRightLabel" className='card-title'>
                    Videos qo'shish
                </h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                <form autoComplete='off' onSubmit={updateVideos}>
                    <div className='mb-3'>
                        <label htmlFor="nameUz"
                               className='card-title mb-0'>videosning O'zbekcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameUz" placeholder='Masalan: shirinliklar'
                               value={nameUz} onChange={e => setUzName(e.target.value)}/>

                        <label htmlFor="nameEn"
                               className='card-title mb-0'>videosning Inglizcha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameEn" placeholder='For example: shirinliklar'
                               value={nameEn} onChange={e => setEnName(e.target.value)}/>

                        <label htmlFor="nameRu"
                               className='card-title mb-0'>videosning Ruscha nomlanishini
                        </label>
                        <input type="text" className="form-control" id="nameRu" placeholder='Например: shirinliklar'
                               value={nameRu} onChange={e => setRuName(e.target.value)}/>

                        <label htmlFor="videos"
                               className='card-title mb-0'>videosning videos nomlanishini
                        </label>
                        <input type="text" className="form-control" id="videos" placeholder='Например: videos'
                               value={videos} onChange={e => setVideos(e.target.value)}/>

                        <label htmlFor="img"
                               className='card-title mb-0'>imgning nomlanishini
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