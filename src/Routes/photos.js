import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import LoadingBar from "react-top-loading-bar";
import '../App.css';


export default function Photos(props) {

    const API_KEY = process.env.REACT_APP_GALLERY_KEY;

    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(10);


    const FetchData = async () => {
        setProgress(30);
        let url = `https://pixabay.com/api/?key=${API_KEY}&q=sports+game&image_type=all`;
        const resourse = await fetch(url);
        const data = await resourse.json();
        const fetchData = await data.hits;
        console.log('Fetch Data Result:', fetchData);

        const filteredData = fetchData.map(item => ({
            imageURL: item.webformatURL,
            likes: item.likes,
            comments: item.comments,
            downloads: item.downloads,
            views:item.views,
            user: item.user,
            tags: item.tags,
        }));
        setImages(filteredData);
        setProgress(100);
        
    }

    useEffect(() => {
        FetchData();
        
    }, []);
    //useEffect(() => {
    //    console.log('Images:', images);
    //},[images])
    
    return (
        <>
            <LoadingBar
                className='loading-bar'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className='container mt-4 p-2'>
                <h1 className='text-center mb-2'>SMOS Gallery</h1>
                <div className='row'>
                    {
                        images.map((image, index) => {

                            return <div className='col-md-4 md-4 d-flex justify-content-center'>
                                <Cards
                                    imageUrl={image.imageURL}
                                    likes={image.likes}
                                    views={image.views}
                                    comments={image.comments}
                                    downloads={image.downloads }
                                />
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    );
}