import * as React from 'react';
 import '../styles/LandingPageStyles.css'


export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            componentToShow: "landingPage"
        };

    }

    render() {
        return (
            <div className='landingPage-body'>
                <body className='main'>
                    <img src={require('../images/logo.png')} alt="Logo" className='landingPage-image' />
                    <div className="bd-content ps-lg-4 d-flex flex-column flex-lg-row align-items-center justify-content-md-center gap-2 mb-4">
                        <div className="d-grid gap-2 d-md-block">
                            <a href='./api/register'>
                                <button className="btn btn-primary border-0 landingPage-btn" type="button">REGISTER</button>
                            </a>
                            <a href='./api/login'>
                                <button className="btn btn-primary border-0 landingPage-btn" type="button">LOGIN</button>
                            </a>
                        </div>
                    </div>
                </body>
            </div>
        )
    }
}    

