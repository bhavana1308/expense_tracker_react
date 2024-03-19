import React from 'react';
import { Link } from 'react-router-dom';

const LogoutSuccess = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <p>Successfully logged out! Please <Link to="/">login</Link> to continue.</p>
            </div>
        </div>
    );
}

export default LogoutSuccess;