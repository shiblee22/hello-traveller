import React, { useEffect, useState } from 'react';
import vehiclesData from "../../fakeData/vehiclesData.json";
import Vehicle from '../Vehicle/Vehicle';
import "./Home.css";

const Home = () => {

    const [vehicles , setVehicles] = useState([]);
    useEffect(() => {
        setVehicles(vehiclesData);
    }, [])

    return (
        <div className="home-page">
        <div className="container pt-5">
        <div className="row pt-5">
            {vehicles.map( vehicle => <Vehicle key={vehicle.id} vehicle={vehicle}></Vehicle>)}
        </div>
        </div>
        </div>
    );
};

export default Home;