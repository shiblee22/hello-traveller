import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './../../App';

const Header = () => {
    const [loggedInUser] = useContext(UserContext);
    const { isSignedIn, name } = loggedInUser;
    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-secondary">
            <div className="container">
                <Link to="/" className="navbar-brand"><h1>HELLO TRAVELLER </h1></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Destination</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">Contact</Link>
                        </li>
                        <li className="nav-item">
                            {isSignedIn ? <p className="nav-link bg-danger rounded">{name}</p> : <Link to="/login" className="nav-link bg-danger rounded">Login</Link>}
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;