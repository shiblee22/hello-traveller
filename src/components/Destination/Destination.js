import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import vehiclesData from "../../fakeData/vehiclesData.json";
import peopleIcon from "../../images/peopleicon.png";
import GoogleMap from '../GoogleMap/GoogleMap';

const Destination = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState([]);
    const [destinations, setDestinations] = useState({
        pickTo: "",
        pickFrom: ""
    })
    const [isSubmitted, setIsSubmitted] = useState(false);
    useEffect(() => {
        const vehicle = vehiclesData.find(item => item.id === id);
        setVehicle(vehicle);
    }, [id])
    const { vehicleName, imgUrl, fair } = vehicle;

    const handleBlur = (e) => {
        const newDestinations = { ...destinations };
        newDestinations[e.target.name] = e.target.value;
        setDestinations(newDestinations);
    }
    const handleSearch = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    }

    return (
        <div className="container mt-3">
            <div className="row">
                {!isSubmitted ?
                    <div className="col-12 col-lg-4">
                        <div className="p-3"  style={{ backgroundColor: "lightgray", borderRadius:"5px" }}>
                        <form onSubmit={handleSearch}>
                            <div className="mb-3">
                                <label htmlFor="pickFrom" className="form-label">Pick From</label>
                                <input type="text" className="form-control" name="pickFrom" onBlur={handleBlur} required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pickTo" className="form-label">Pick To</label>
                                <input type="text" className="form-control" name="pickTo" onBlur={handleBlur} required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input type="date" className="form-control" name="date" required></input>
                            </div>
                            <button className="form-control btn-danger" type="submit">Search</button>
                        </form>
                        </div>
                    </div> :
                    <div className="col-12 col-lg-4">
                        <div className="p-3"  style={{ backgroundColor: "lightgray", borderRadius:"5px" }}>
                        <div className="bg-danger text-dark" style={{borderRadius:"5px", padding:"10px"}}>
                            <h3>{destinations.pickFrom}</h3>
                            <p>to</p>
                            <h3>{destinations.pickTo}</h3>
                        </div>
                        <div className="p-2">
                            <div className="row d-flex align-items-center mt-2" style={{ backgroundColor: "white", borderRadius:"5px" }}>
                                <img className="col-3 img-fluid" src={imgUrl} alt=""></img>
                                <h5 className="col-2">{vehicleName}</h5>
                                <img className="col-2 img-fluid" src={peopleIcon} alt=""></img>
                                <h5 className="col-2">1</h5>
                                <h5 className="col-3">${fair.onePerson}</h5>
                            </div>
                            <div className="row d-flex align-items-center mt-2" style={{ backgroundColor: "white", borderRadius:"5px" }}>
                                <img className="col-3 img-fluid" src={imgUrl} alt=""></img>
                                <h5 className="col-2">{vehicleName}</h5>
                                <img className="col-2 img-fluid" src={peopleIcon} alt=""></img>
                                <h5 className="col-2">2</h5>
                                <h5 className="col-3">${fair.twoPerson}</h5>
                            </div>
                            <div className="row d-flex align-items-center mt-2" style={{ backgroundColor: "white", borderRadius:"5px" }}>
                                <img className="col-3 img-fluid" src={imgUrl} alt=""></img>
                                <h5 className="col-2">{vehicleName}</h5>
                                <img className="col-2 img-fluid" src={peopleIcon} alt=""></img>
                                <h5 className="col-2">4</h5>
                                <h5 className="col-3">${fair.fourPerson}</h5>
                            </div>
                        </div>
                        </div>
                    </div>}
                <div className="col-12 col-lg-7">
                    <GoogleMap></GoogleMap>
                </div>
            </div>
        </div>
    );
};

export default Destination;