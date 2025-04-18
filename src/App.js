import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Photos from './Routes/photos';

export default function App(props) {

    const APIKey = process.env.REACT_APP_NEWS_API_KEY;

    const [progress, setProgress] = useState(10);
    const [searchTerm, setSearchTerm] = useState('sports game');

    return (
        <>
           
            <Navbar title="SMOS Gallery" setSearchTerm={setSearchTerm} />
            <Routes>
                <Route excat path='/' element={<Photos searchTerm={searchTerm} />} />
            </Routes>

        </>
    );
}


