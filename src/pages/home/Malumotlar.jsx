import React, {useEffect, useState} from "react";
import {baseConfig} from "../../base/baseConfig";
import {embeddedGet} from "../../base/service/service";
import {Loader} from "../../component/umumiyComponents/Loader";

export const Malumotlar = () => {
    const ru = localStorage.getItem("ruLan")
    const en = localStorage.getItem("enLan")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [carusel, setCarusel] = useState('')
    const [img, setImg] = useState('')
    const [descriptionUz, setDescriptionUz] = useState('')
    const [descriptionEn, setDescriptionEn] = useState('')
    const [descriptionRu, setDescriptionRu] = useState('')
    const [defaults, setdefaults] = useState(true);

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

    const getOne = async (id) => {
        try {
            const res = await baseConfig.doGetOne(id, "carusel/")
            setCarusel(res.data.nameUz)
            setImg(res.data.img)
            setDescriptionUz(res.data.descriptionUz)
            setDescriptionEn(res.data.descriptionEn)
            setDescriptionRu(res.data.descriptionRu)
            setdefaults(false)
        } catch (err) {
        }
    }

    const defaultsTrue = () => {
        setdefaults(true)
    }

    return (
        <>
            {loading ? (
                <>
                    {data.length !== 0 ? (
                        <>
                            <h1 className="col-12 text-center text-success p-4">
                                {ru === "true" ? "моя информация" : en === "true" ? "моя информация" : "malumotlarim"}
                            </h1>
                            <div className="col-12">
                                <div className="col-12">
                                    <div id="carouselMaterialStyle" className="carousel slide carousel-fade"
                                         style={{margin: '2rem 0'}}
                                         data-mdb-ride="carousel">
                                        <div className="boxs col-8 carousel-indicators">
                                            <>
                                                <button data-mdb-slide-to="0"
                                                        className="cards col-2 col-md-1 col-sm-2"
                                                        onClick={() => defaultsTrue()} aria-current="true"
                                                        aria-label={`Slide`}>all
                                                </button>
                                                {data.map((item, i) => (
                                                    <button data-mdb-slide-to="0"
                                                            className="cards col-2 col-md-1 col-sm-2"
                                                            onClick={() => getOne(item.id)} aria-current="true"
                                                            aria-label={`Slide ${item.id}`}>{i + 1}</button>
                                                ))}
                                            </>
                                        </div>

                                        {defaults === false ? (
                                            <div className="carousel-inner rounded-5 shadow-4-strong">
                                                <div className={`carousel-item active`}>
                                                    <img src={img} className="d-block w-100" style={{height: '80vh'}}
                                                         alt=""/>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="carousel-inner rounded-5 shadow-4-strong">
                                                <div className={`carousel-item active`}>
                                                    <img src="/assets/A.jpg" className="d-block w-100"
                                                         style={{height: '80vh'}}
                                                         alt=""/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {defaults === false ? (
                                <>
                                    <h2 className="col-12 text-center text-success p-1">{carusel}</h2>
                                    <h6 className="col-12 text-center text-success p-1">{ru === "true" ? descriptionRu : en === "true" ? descriptionEn : descriptionUz}</h6>
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <h1 className="text-success text-center">{ru === "true" ? "информация недоступна" : en === "true" ? "information not available" : "malumot mavjud emas"}</h1>
                    )}
                </>
            ) : (
                <>
                    <Loader/>
                </>
            )}
        </>
    )
}