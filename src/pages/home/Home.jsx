import React, {useEffect, useState} from "react";
import {embeddedGet} from "../../base/service/service";
import {Loader} from "../../component/umumiyComponents/Loader";
import {baseConfig} from "../../base/baseConfig";
import {WorkingMenyu} from "./WorkingMenyu";
import {VideosMenyu} from "./VideosMenyu";

export const Home = () => {
    return (
        <div style={{margin: '30px 0'}}>
            <div id="carouselDarkVariant" className="carousel slide carousel-fade carousel-dark m-0 p-0"
                 data-mdb-ride="carousel">
                <div className="carousel-indicators">
                    <button
                        data-mdb-target="#carouselDarkVariant"
                        data-mdb-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    />
                    <button
                        data-mdb-target="#carouselDarkVariant"
                        data-mdb-slide-to="1"
                        aria-label="Slide 1"
                    />
                </div>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/assets/bb.jpg"
                             className="d-block w-100" alt="Motorbike Smoke"/>
                    </div>

                    <div className="carousel-item">
                        <img src="/assets/A.jpg"
                             className="d-block w-100" alt="Mountaintop"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button"
                        data-mdb-target="#carouselDarkVariant" data-mdb-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                        data-mdb-target="#carouselDarkVariant" data-mdb-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="mt-5 mb-5">
                <WorkingMenyu/>
            </div>
            <div className="mt-5 mb-5">
                <VideosMenyu/>
            </div>
        </div>
    )
}