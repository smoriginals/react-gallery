import React, { useEffect } from 'react';

export default function Photos(props) {

    const API_KEY = process.env.REACT_APP_GALLERY_KEY;

    const FetchData = async () => {
        let url = `https://pixabay.com/api/?key=${API_KEY}&q=yellow+flower&image_type=all`;
        const resourse = await fetch(url);
        const data = await resourse.json();
        console.log(data);
    }

    useEffect(() => {
        FetchData();
    }, []);

    return (
        <>
            <div className='container'>
                <h1>Fetching Data...</h1>
            </div>
        </>
    );
}