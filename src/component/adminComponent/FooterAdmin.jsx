import React from "react";
import {Link} from "react-router-dom";

export const FooterAdmin = () => {
    return(
        <div className="col-12 d-flex align-items-center justify-content-end position-fixed bg-light bottom-0" style={{boxShadow:'2px 2px 20px 10px rgb(1 41 112 / 10%)'}}>
            <div className="col-10 d-flex align-items-center justify-content-center">
                <Link to={"/admin"} className="text-primary" style={{height:'50px', lineHeight:'50px', fontSize:'26px'}}>Dr.Kodirov.uz</Link>
            </div>
        </div>
    )
}