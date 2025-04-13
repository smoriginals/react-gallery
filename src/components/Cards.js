import Recat, { Component } from 'react';
import PropTypes from 'prop-types';
export default function Cards(props) {

    return (
        <>
            <div className="card">
                <img src={props.imageUrl} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="text-secondary">Published on: {props.pubDate}</p>
                    <a href={props.newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
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