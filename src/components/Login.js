import React, { useState } from 'react';
import { request, setAuthToken } from '../axios_helper';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginFormStyles.css';


const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const onSubmitParentLogin = async (e) => {
        e.preventDefault();

        // Basic input validation
        if (!formData.username || !formData.password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const response = await request("POST", "/api/login", formData);
            setAuthToken(response.data.token);
            // navigate('/api/dashboard');
        } catch (error) {
            console.error("Login failed:", error);
            alert("Invalid username or password. Please try again.");
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className='body'>
           <header className='header-body'>
                <a href='/'>
                    <img src={require('../images/small_logo.png')} alt='Small Logo' className='header-logo' />
                </a>
            </header>
            <div className='tab-pane fade show active' id='pills-register'>
                <form className='form' onSubmit={onSubmitParentLogin}>
                    <div className=''>
                        <div className='jumbotron jumbotron'>
                            <div className='container'>
                                <h1 className='row justify-content-center display-4 welcome-message'>Welcome Back!</h1>
                            </div>
                        </div>
                    </div>
                    <div className='form-outline mb-4'>
                        <input type="text input-lg" id='username' name='username' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='username'>Username</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type='password' id='password' name='password' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='password'>Password</label>
                    </div>
                    <div className='row justify-content-center d-grid gap-2 col-6 mx-auto'>
                        <button className='btn btn-primary register-btn' type='submit button'>Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
