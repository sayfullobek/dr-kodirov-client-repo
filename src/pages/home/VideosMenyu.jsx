import React, {useEffect, useState} from "react";
import {embeddedGet} from "../../base/service/service";
import {Loader} from "../../component/umumiyComponents/Loader";

export const VideosMenyu = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)
    const ru = localStorage.getItem("ruLan")
    const en = localStorage.getItem("enLan")

    const getAll = async () => {
        try {
            await embeddedGet("videos", setVideos, "embedded")
            setLoading(true)
        } catch (err) {
        }
    }

    useEffect(() => {
        getAll()
    }, [])
    return (
        <>
            {loading ? (
                <>
                    <h1 className="text-center mb-5 text-success"
                        style={{color: 'rgb(31 227 174 / 90%)'}}>{ru === "true" ? "видео того, что я сделал" : en === "true" ? "videos of what I've done" : "qilgan ishlarimning videolari"}</h1>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {videos.map(item => (
                            <div className="col col-md-4">
                                <div className="aaa card" style={{height: '46vh'}}>
                                    <div style={{
                                        width: '100%',
                                        height: '70%',
                                        backgroundImage: `url(${item.img})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        cursor: 'pointer'
                                    }}>
                                        <div className="w-100 d-flex align-items-center justify-content-center"
                                             style={{height: '100%', backgroundColor: 'rgba(0,0,0,.5)'}}>
                                            <a href={item.videos}>
                                                <i className="bi bi-youtube"
                                                   style={{fontSize: '80px'}}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{ru === "true" ? item.nameRu : en === "true" ? item.nameEn : item.nameUz}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <Loader/>
                </>
            )}
        </>
    )
}