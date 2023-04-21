import React, {useEffect, useState} from "react";
import {embeddedGet} from "../../base/service/service";
import {Loader} from "../../component/umumiyComponents/Loader";

export const WorkingMenyu = () => {
    const ru = localStorage.getItem("ruLan")
    const en = localStorage.getItem("enLan")
    const [working, setWorking] = useState([])
    const [loading, setLoading] = useState(false)

    const getAll = async () => {
        try {
            await embeddedGet("working", setWorking, "embedded")
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
                    <h1 className="text-center mb-5 text-success">{ru === "true" ? "что я сделал" : en === "true" ? "what i did" : "qilgan ishlarim"}</h1>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {working.map(item => (
                            <div className="col col-md-4">
                                <div className="aaa card" style={{height: '80vh'}}>
                                    <img src={item.img} className="card-img-top" style={{width: '100%', height: '70%'}}
                                         alt=""/>
                                    <div className="card-body">
                                        <h5 className="card-title">{ru === "true" ? item.nameRu : en === "true" ? item.nameEn : item.nameUz}</h5>
                                        <p className="card-text text-truncate">
                                            {ru === "true" ? item.descriptionRU : en === "true" ? item.descriptionEN : item.descriptionUz}
                                        </p>
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