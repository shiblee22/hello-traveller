import React from 'react';
import { Link } from 'react-router-dom';

const Vehicle = (props) => {

    const {id, vehicleName, imgUrl} = props.vehicle;
    return (
        <div className="col-lg-3 col-md-6 col-12 mt-3 p-2">
        <Link style={{textDecoration:"none"}} to={"/destination/"+id}>
        <div className="m-1 text-center" style={{ backgroundColor: "white", borderRadius:"5px" }}>
            <img src={imgUrl} className="p-2 img-fluid" alt="..." style={{height:"12rem"}}></img>
            <h3>{vehicleName.toUpperCase()}</h3>
        </div>
        </Link>
        </div>
    );
};

export default Vehicle;