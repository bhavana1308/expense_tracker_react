import * as React from 'react';
import '../styles/NavbarStyles.css';
import Logout from './Logout';

export default function Navbar() {


    return (
        <header className='header-body'>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <img src={require('../images/small_logo.png')} alt='Small Logo' className='header-logo' />
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/api/expenses/yearly">Home</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/api/expense/add">Add Expense</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/api/expense/list">Expenses List</a>
                            </li>

                            <li class="nav-item">
                                <Logout />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
