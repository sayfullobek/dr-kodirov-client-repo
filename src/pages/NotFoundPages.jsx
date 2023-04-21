import React from "react";
import {Link} from "react-router-dom"

export const NotFoundPages = () => {
    return (
        <div className="col-12 d-flex align-items-center justify-content-center flex-column">
            <h1 className="text-center">404 Not found pages</h1>
            <Link to={"/"} className="btn btn-primary">primary menyu</Link>
        </div>
    )
}