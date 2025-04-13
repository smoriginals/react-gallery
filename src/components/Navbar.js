import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
export default function Navbar(props) {

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand textlight">SMOS Gallery</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link textlg">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link textlg" to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link textlg" to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link textlg" to="/sports">Sports</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='container'>
                <div className="container-fluid mt-5 pt-4">
                    <div className="d-flex">
                        <input className="form-control mx-2 br" placeholder='Search For Free Images...'/>
                        <button className="btn btn-primary btn-anim br">Search</button>
                    </div>
                </div>
            </div>
        </>
    )
}