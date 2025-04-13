import React, { useState,useEffect } from 'react';
import Cards from './Cards';
import PropTypes from 'prop-types';
import Loading from './Loading';
import InfiniteScroll from "react-infinite-scroll-component";

export default function Newsitems(props) {

    const APIkey = process.env.REACT_APP_NEWS_API_KEY;

    const [state, setState] = useState({
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0,
        isEnd: false,
    });

    useEffect(() => {
        FetchData()
    }, []);


    const FetchData = async () => {

        setState((prevState) => ({
            ...prevState,
            loading: true,
        }));

        const currentDate = new Date(Date.now()).toISOString().split('T')[0];

        let url = `https://newsapi.org/v2/${props.endPoint}?country=${props.country}&category=${props.category}&from=${currentDate}&sortBy=publishedAt&apiKey=${APIkey}&pageSize=${props.pageSize}&page=${state.page}`;

        

        props.setProgress(30);

        let data = await fetch(url);

        props.setProgress(100);

        if (data.status === 200) {
            let response = await data.json();
             console.log(response);
            let filteredArticles = response.articles.filter(article =>
                article.title !== "[Removed]" &&
                article.description !== "[Removed]" &&
                article.urlToImage !== null &&
                article.content !== "[Removed]"
            );

            filteredArticles = filteredArticles.map(article => ({
                ...article,
                publishedAt: new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
            }));

            setState((prevState) => ({
                ...prevState,
                articles: filteredArticles,
                totalResults: response.totalResults,
                loading: false,
            }));

        } else {
            setState((prevState) => ({
                ...prevState,
                loading: false
            }));
            props.setProgress(100);
        }

    }

    const Fetching = async () => {

        const nextPage = state.page + 1;

        setState((prevState) => ({
            ...prevState,
            page: nextPage,
        }));

        const currentDate = new Date(Date.now()).toISOString().split('T')[0];

        let url = `https://newsapi.org/v2/${props.endPoint}?country=${props.country}&category=${props.category}&from=${currentDate}&sortBy=publishedAt&apiKey=${APIkey}&pageSize=${props.pageSize}&page=${nextPage}`;

        let data = await fetch(url);
        let response = await data.json();

        let filteredArticles = response.articles.filter(article =>
            article.title !== "[Removed]" &&
            article.description !== "[Removed]" &&
            article.urlToImage !== null &&
            article.content !== "[Removed]"
        );

        filteredArticles = filteredArticles.map(article => ({
            ...article,
            publishedAt: new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        }));

        setState((prevState) => ({
            ...prevState,
            articles: [...prevState.articles, ...filteredArticles], //?
            totalResults: response.totalResults,
            loading: false,
        }));

    }

    return (
        <>
            <div className="text-center mt-5 pt-1">
                {state.loading && state.articles.length === 0 ? <Loading /> : null}
            </div>
            <div className="container my-4 text-left">
                <InfiniteScroll
                    dataLength={state.articles.length}
                    next={Fetching}
                    hasMore={state.articles.length < state.totalResults}
                    loader={<div className="text-center"><Loading /></div>}
                    scrollableTarget="scrollableDiv"
                >

                    <div className="row">
                        {state.articles.map((e, index) => (
                            <div className="col-md-4 my-2" key={index}>
                                <Cards title={<strong>{e.title}</strong>} description={e.description} imageUrl={e.urlToImage} newsUrl={e.url} pubDate={e.publishedAt} />
                            </div>
                        ))}
                    </div>

                </InfiniteScroll>
            </div>
        </>
    );

}

Newsitems.defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'business',
    every: 'top-headlines',
};

Newsitems.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    every: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
};

