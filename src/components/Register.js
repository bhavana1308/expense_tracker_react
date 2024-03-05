import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { request, setAuthToken } from '../axios_helper';
import { Button } from 'bootstrap';
import '../styles/Register.css';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        verifyPassword: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onRegister = (e) => {
        e.preventDefault();

        // Basic input validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.username || !formData.password || !formData.verifyPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (formData.password !== formData.verifyPassword) {
            alert("Passwords do not match.");
            return;
        }

        request("POST", "/api/checkUnique", { username: formData.username, email: formData.email })
            .then((response) => {
                if (response.data.usernameExists) {
                    alert("Username is already taken. Please choose another.");
                } else if (response.data.emailExists) {
                    alert("Email is already registered. Please use a different email address.");
                } else {
                    
                    request("POST", "/api/register", formData)
                        .then((response) => {
                            setAuthToken(response.data.token);
                            setFormData({
                                firstName: "",
                                lastName: "",
                                email: "",
                                username: "",
                                password: "",
                                verifyPassword: "",
                            });
                            navigate('/api/Login');
                        })
                }
            })
    };

    return (
        <div className='body'>
            <header className='header-body'>
                <a href='/' className='container'>
                    <img src={require('../images/TC-sm-logo.png')} alt='Small Logo' className='header-logo' />
                </a>
            </header>
            <div className='tab-pane fade show active' id='pills-register'>
                <form className='register-form' onSubmit={onRegister}>
                    <div className=''>
                        <div>
                            <div className='container'>
                                <h1 className='row justify-content-center display-4'>Welcome</h1>
                                <p className='row justify-content-center lead message'>Create an account with us!</p>
                            </div>
                        </div>
                    </div>
                    <div className='form-outline mb-4'>
                        <input type='text input-lg' id='firstName' name='firstName' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='firstName'>First Name</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type='text input-lg' id='lastName' name='lastName' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='lastName'>Last Name</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type='email' id='email' name='email' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='email'>Email</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type="text input-lg" id='username' name='username' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='username'>Username</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type='password' id='password' name='password' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='password'>Password</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type='password' id='verifyPassword' name='verifyPassword' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='verifyPassword'>Verify Password</label>
                    </div>
                    <div className='row justify-content-center d-grid gap-2 col-6 mx-auto'>
                        <button className='btn btn-primary register-btn' type='submit button'>Create Account</button>
                        </div>
                </form>
            </div>
        </div>
    )

}