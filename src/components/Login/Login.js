import React, { useState } from 'react';
import "./Login.css";
import { useContext } from 'react';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';



function Login() {
    const [newUser, setNewUser] = useState(false);
    const [errorMassages, setErrorMessages] = useState({
        emailError: "",
        passwordError: "",
        inputPassword: "",
        passwordMachError: ""
    })
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, res.success);
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, res.success);
            })

    }
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            if (/\S+@\S+\.\S+/.test(e.target.value)) {
                isFieldValid = true;
                const newErrors = { ...errorMassages };
                newErrors["emailError"] = "";
                setErrorMessages(newErrors)
            } else {
                isFieldValid = false;
                const newErrors = { ...errorMassages };
                newErrors["emailError"] = "Enter a valid email";
                setErrorMessages(newErrors)
            }
        }
        if (e.target.name === 'password') {
            if (e.target.value.length >= 6) {
                isFieldValid = true;
                const newErrors = { ...errorMassages };
                newErrors["passwordError"] = "";
                newErrors["inputPassword"] = e.target.value;
                setErrorMessages(newErrors)
            } else {
                isFieldValid = false;
                const newErrors = { ...errorMassages };
                newErrors["passwordError"] = "Password must be at least 6 charecters";
                setErrorMessages(newErrors)
            }
        }
        if (e.target.name === 'rePassword') {
            if (e.target.value === errorMassages.inputPassword) {
                isFieldValid = true;
                const newErrors = { ...errorMassages };
                newErrors["passwordMachError"] = "";
                setErrorMessages(newErrors)
            } else {
                isFieldValid = false;
                const newErrors = { ...errorMassages };
                newErrors["passwordMachError"] = "Password does not mach to the previous";
                setErrorMessages(newErrors)
            }
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, res.success);
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, res.success);
                })
        }
        e.preventDefault();
    }

    return (
        <div className="container mt-5">
            <div>
            {!newUser ? <div className="card">
                <div className="card-body p-3">
                    <h3>Login</h3>
                    {loggedInUser.error && <p style={{ color: 'red' }}>{loggedInUser.error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input className="form-control mt-3" type="text" name="email" onBlur={handleBlur} placeholder="Email" required />
                        {errorMassages.emailError && <p className="text-danger">{errorMassages.emailError}</p>}
                        <input className="form-control mt-3" type="password" name="password" onBlur={handleBlur} placeholder="Password" required />
                        {errorMassages.passwordError && <p className="text-danger">{errorMassages.passwordError}</p>}
                        <input className="form-control mt-3 bg-warning" type="submit" value="Login" />
                        <h5 className="text-center mt-2">Don't have an account? <Link onClick={() => setNewUser(!newUser)}> Create new account</Link></h5>
                    </form>
                </div>
            </div> :
                <div className="card">
                    <div className="card-body p-3">
                        <h3>Create an Account</h3>
                        {loggedInUser.error && <p style={{ color: 'red' }}>{loggedInUser.error}</p>}
                        <form onSubmit={handleSubmit}>
                            <input className="form-control mt-3" type="text" name="name" onBlur={handleBlur} placeholder="Name" required />
                            <input className="form-control mt-3" type="text" name="email" onBlur={handleBlur} placeholder="Email" required />
                            {errorMassages.emailError && <p className="text-danger">{errorMassages.emailError}</p>}
                            <input className="form-control mt-3" type="password" name="password" onBlur={handleBlur} placeholder="Password" required />
                            {errorMassages.passwordError && <p className="text-danger">{errorMassages.passwordError}</p>}
                            <input className="form-control mt-3" type="password" name="rePassword" onBlur={handleBlur} placeholder="Confirm Password" required />
                            {errorMassages.passwordMachError && <p className="text-danger">{errorMassages.passwordMachError}</p>}
                            <input className="form-control mt-3 bg-warning" type="submit" value="Create an Account" />
                            <h5 className="text-center mt-2">Already have an account? <Link onClick={() => setNewUser(!newUser)}> Login</Link></h5>
                        </form>
                    </div>
                </div>}
                </div>
            <div>
                <p className="text-center">or</p>
                <div className="signin-button mx-auto mt-2" onClick={googleSignIn}><FontAwesomeIcon icon={faGoogle} size="2x" /><h5 className="mx-auto">Continue with Google</h5></div>
                <div className="signin-button mx-auto mt-2" onClick={fbSignIn}><FontAwesomeIcon className="text-primary" icon={faFacebook} size="2x" /><h5 className="mx-auto">Continue with Facebook</h5></div>
            </div>
        </div>
    );
}

export default Login;