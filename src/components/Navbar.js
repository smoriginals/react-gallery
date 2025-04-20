import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
export default function Navbar(props) {

    const [inputValue, setInputValue] = useState('');
    //const [searchTerm, setSearchTerm] = useState('red rose');

    const HandleChange = (e) => {
        setInputValue(e.target.value);
    }

    const HandleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            HandleClick();
        }
    }

    const HandleClick = () => {
        if (inputValue.trim() !== '') {
            props.setSearchTerm(inputValue);
            setInputValue('');
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg backg">
                <div className="container-fluid">
                    <Link className="navbar-brand ">{props.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link mx-2 backg" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-1 backg" to="/nature">Nature</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-1 backg" to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-1 backg" to="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-1 backg" to="/cars">Cars</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-1 backg" to="/sky">Sky's</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-1 backg" to="/videos">Videos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-1 backg" to="/3d">3D</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
            <div className='container'>
                <div className="container-fluid mt-5 pt-4">
                    <div className="d-flex">
                        <input className="form-control mx-2 br" placeholder='Search For Free Images...' onChange={HandleChange} onKeyDown={HandleKeyPress} />
                        <button className="btn btn-primary btn-anim br" onClick={HandleClick}>Search</button>
                    </div>
                </div>
            </div>
        </>
    )
}