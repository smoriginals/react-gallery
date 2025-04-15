import Recat, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
export default function Cards(props) {

    return (
        <>
            <div className="card m-2 card-bg">
                <img src={props.imageUrl} className="card-img-top" alt="" />
                <div className="card-body">
                    <div className='container d-flex justify-content-between'>
                        <i class="fa-solid fa-heart"></i>
                        <i class="fa-solid fa-eye mx-2"></i>
                        <i class="fa-solid fa-comments"></i>
                        <i class="fa-solid fa-circle-down mx-2"></i>
                    </div>
                    
                </div>
            </div>

        </>
    )
}
//Cards.defaultProps = {
//    title: "No Title Available",
//    description: "No Description Available",
//    imageUrl: "https://via.placeholder.com/150",
//    newsUrl: "#",
//    pubDate: null,

//};