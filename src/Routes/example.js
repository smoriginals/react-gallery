import React, { useState, useEffect } from 'react';
import Cards from './Cards';
import PropTypes from 'prop-types';   //?
import Loading from './Loading';
import InfiniteScroll from "react-infinite-scroll-component";

export default function Newsitems(props) {

    const APIkey = process.env.REACT_APP_NEWS_API_KEY;

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

        const currentDate = new Date().toISOString().split('T')[0];
        const url = `https://newsapi.org/v2/${props.endPoint}?country=${props.country}&category=${props.category}&from=${currentDate}&sortBy=publishedAt&apiKey=${APIkey}&pageSize=${props.pageSize}&page=1`;

        props.setProgress(30);

        let response = await fetch(url);
        props.setProgress(100);

        if (response.status === 200) {
            let result = await response.json();

            let filtered = result.articles.filter(article =>
                article.title !== "[Removed]" &&
                article.description !== "[Removed]" &&
                article.urlToImage !== null &&
                article.content !== "[Removed]"
            );

            filtered = filtered.map(article => {
                article.publishedAt = new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
                return article;
            });

            setArticles(filtered);
            setTotalResults(result.totalResults);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const fetchMore = async () => {
        const nextPage = page + 1;
        setPage(nextPage);

        const currentDate = new Date().toISOString().split('T')[0];
        const url = `https://newsapi.org/v2/${props.endPoint}?country=${props.country}&category=${props.category}&from=${currentDate}&sortBy=publishedAt&apiKey=${APIkey}&pageSize=${props.pageSize}&page=${nextPage}`;

        let response = await fetch(url);
        let result = await response.json();

        let filtered = result.articles.filter(article =>
            article.title !== "[Removed]" &&
            article.description !== "[Removed]" &&
            article.urlToImage !== null &&
            article.content !== "[Removed]"
        );

        filtered = filtered.map(article => {
            article.publishedAt = new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            return article;
        });

        setArticles(articles.concat(filtered));
        setTotalResults(result.totalResults);
        setLoading(false);
    };

    return (
        <>
            <div className="text-center mt-5 pt-1">
                {loading && articles.length === 0 ? <Loading /> : null}
            </div>
            <div className="container my-4 text-left">
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMore}
                    hasMore={articles.length < totalResults}
                    loader={<div className="text-center"><Loading /></div>}
                >
                    <div className="row">
                        {articles.map((item, index) => (
                            <div className="col-md-4 my-2" key={index}>
                                <Cards
                                    title={<strong>{item.title}</strong>}
                                    description={item.description}
                                    imageUrl={item.urlToImage}
                                    newsUrl={item.url}
                                    pubDate={item.publishedAt}
                                />
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
    endPoint: 'top-headlines',
};

Newsitems.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    endPoint: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
};



//newsitem 1------------------------------------------

import React, { Component } from 'react';
import Cards from './Cards';
import PropTypes from 'prop-types';
import Loading from './Loading';
import InfiniteScroll from "react-infinite-scroll-component";


export default class Newsitems extends Component {

    APIkey = "8bc01474b5a947b48efba4665f6d4439";
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            isEnd: false
        };

    }

    static defaultProps = {
        country: 'us',
        pageSize: 6,
        category: 'business',
        every: 'top-headlines',
    };
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        every: PropTypes.string,
    };

    async componentDidMount(e) {

        this.setState({ loading: true });

        const currentDate = new Date(Date.now());
        const yetDate = currentDate.toISOString().split('T')[0];

        let url2 = `https://newsapi.org/v2/${this.props.every}?&country=${this.props.country}&category=${this.props.category}&from=${yetDate}&sortBy=publishedAt&apiKey=${this.APIkey}&pageSize=${this.props.pageSize}&page=1`;
        try {
            let data = await fetch(url2);

            if (data.status === 200) {

                let responce = await data.json();

                let filteredArticles = responce.articles.filter(article => article.title !== "[Removed]" &&
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

                this.setState({
                    articles: filteredArticles,
                    totalResults: responce.totalArticles,
                    page: this.state.page,
                    isEnd: e * 6 >= responce.totalResults,
                    loading: false,
                });

            }
            else {
                this.setState({ loading: false });
                console.error(data.status);
            }
        } catch (error) {
            console.error(error);
            this.setState({ loading: false });
        }


    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        });
    }

    render() {


        return (
            <>

                <div className="text-center">
                    {this.state.loading ? <Loading /> : null}
                </div>
                <div className="container my-4 text-center">

                    <InfiniteScroll
                        dataLength={this.state.totalResults}
                        next={this.fetchMoreData}

                        hasMore={this.state.totalResults > this.state.totalResults}
                        loader={<Loading />}
                        scrollableTarget="scrollableDiv"
                    >

                        <div className="row">
                            {this.state.articles.map((e, index) => {


                                return <div className="col-md-4 my-2" key={index}>

                                    <Cards title={<strong>{e.title}</strong>} description={e.description} imageUrl={e.urlToImage} newsUrl={e.url} pubDate={e.publishedAt} />

                                </div>;
                            })}
                        </div>
                    </InfiniteScroll>

                </div>

            </>
        );
    }
}