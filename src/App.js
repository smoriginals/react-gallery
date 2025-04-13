import './App.css';
import logo from './logo.svg';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import Newsitems from './components/Newsitems';
import { Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import LoadingBar from "react-top-loading-bar";

export default function App(props) {

    const APIKey = process.env.REACT_APP_NEWS_API_KEY;

    const [progress, setProgress] = useState(10);

    return (
        <>
            <LoadingBar
                color="blue"
                progress={progress}
                onLoaderFinished={()=>setProgress(0)}
            />

            <Navbar title="BBC NEWS" />
            <Routes>
                <Route excat path="/" element={<Newsitems setProgress={setProgress}  key="general" pageSize={6} country="us" endPoint="top-headlines" category="general" />} />
                <Route excat path="/entertainment" element={<Newsitems setProgress={setProgress} key="entertainment" pageSize={6} country="us" endPoint="top-headlines" category="entertainment" />} />
                <Route excat path="/health" element={<Newsitems setProgress={setProgress} key="health" pageSize={6} country="us" endPoint="top-headlines" category="health" />} />
                <Route excat path="/science" element={<Newsitems setProgress={setProgress} key="science" pageSize={6} country="us" endPoint="top-headlines" category="science" />} />
                <Route excat path="/technology" element={<Newsitems setProgress={setProgress} key="technology" pageSize={6} country="us" endPoint="top-headlines" category="technology" />} />
                <Route excat path="/business" element={<Newsitems setProgress={setProgress} key="business" pageSize={6} country="us" endPoint="top-headlines" category="business" />} />
                <Route excat path="/sports" element={<Newsitems setProgress={setProgress} key="sports" pageSize={6} country="us" endPoint="top-headlines" category="sports" />} />
            </Routes>
        </>
    );
}


