import React from 'react';
import axios from 'axios';
import { deleteAuthToken } from '../axios_helper';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout');
            deleteAuthToken();
            navigate('/api/logout-success');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div>
            <button className="btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Logout;