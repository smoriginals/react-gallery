import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
export default function Photos(props) {

    const API_KEY = process.env.REACT_APP_GALLERY_KEY;

    const [images, setImages] = useState([]);

    const FetchData = async () => {
        let url = `https://pixabay.com/api/?key=${API_KEY}&q=yellow+flower&image_type=all`;
        const resourse = await fetch(url);
        const data = await resourse.json();
        const fetchData = await data.hits;
        console.log(fetchData);

        const filteredData = fetchData.map(item => item.webformatURL);
        setImages(filteredData);
        console.log(images);
    }

    useEffect(() => {
        FetchData();
    }, []);
    useEffect(() => {
        console.log(images);
    }, [images]);

    return (
        <>
            <div className='container mt-4'>
                <h1 className='text-center mb-2'>SMOS Gallery</h1>
                <div className='row'>
                    {
                        images.map((image, index) => {

                            return <div className='col-md-4 md-4 d-flex justify-content-center'>
                                <Cards imageUrl={image} />
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    );
}