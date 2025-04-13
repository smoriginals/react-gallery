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

                        hasMore={this.state.totalResults>this.state.totalResults}
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
