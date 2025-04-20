import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Photos from './Routes/photos';

export default function App(props) {
    const [searchTerm, setSearchTerm] = useState('pixabay');
    return (
        <>
           
            <Navbar title="SMOS Gallery" setSearchTerm={setSearchTerm} />
            <Routes>
                <Route excat path='/' element={<Photos searchTerm={searchTerm} />} />
                <Route excat path='/nature' element={<Photos searchTerm='nature' />} />
                <Route excat path='/business' element={<Photos searchTerm='business' />} />
                <Route excat path='/sports' element={<Photos searchTerm='sports' />} />
                <Route excat path='/cars' element={<Photos searchTerm='cars' />} />
                <Route excat path='/sky' element={<Photos searchTerm='sky' />} />
                <Route excat path='/videos' element={<Photos searchTerm='videos' />} />
                <Route excat path='/3D' element={<Photos searchTerm='3D' />} />
            </Routes>

        </>
    );
}


