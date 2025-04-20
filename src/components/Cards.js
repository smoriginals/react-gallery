import Recat, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
export default function Cards(props) {

    return (
        <>
            <div className="card m-2 card-bg rounded-2">
                <a href={props.fullImageUrl} target="_blank" rel="noopener noreferrer">
                <img src={props.imageUrl} className="card-img-top content-adj" />
                </a>
                <div className="card-body">
                    <div className='container setbg'>
                        <i class="fa-solid fa-heart animico "></i>
                        <i class="fa-solid fa-eye mx-2 animico"></i>
                        <i class="fa-solid fa-comments animico"></i>
                        <i class="fa-solid fa-circle-down mx-2 animico"></i>
                    </div>
                    <div className='container subs'>
                        <p>{props.likes}</p>
                        <p>{props.views}</p>
                        <p>{props.comments}</p>
                        <p>{props.downloads}</p>
                    </div>
                    <div className="card-tags p-2 d-flex justify-content-center gap-2">
                        <span className="badge text-black tb">{props.tags}</span>
                    </div>
                </div>
            </div>

        </>
    )
}
