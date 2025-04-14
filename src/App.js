import './App.css';
import logo from './logo.svg';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import { Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import LoadingBar from "react-top-loading-bar";
import Photos from './Routes/photos';

export default function App(props) {

    const APIKey = process.env.REACT_APP_NEWS_API_KEY;

    const [progress, setProgress] = useState(10);

    return (
        <>
            <LoadingBar
                color="green"
                progress={progress}
                onLoaderFinished={()=>setProgress(0)}
            />

            <Navbar title="SMOS Gallery" />
            <Photos/>
            <Routes>
               <Route/>
            </Routes>
        </>
    );
}


