'use strict';

import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import config from  '../config.json';


const filmProps = {
    title: null,
    id: null,
    rating: null,
    date: null,
    poster: null
};

class Film extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div className="film-results__film">
                <div className="film-results__poster">
                    <img src={this.state.poster} width="300" />
                 </div>
                 <div className="film-results__rating">
                    <div className="film-results__score">{this.state.rating}</div>
                    <div
                        className="film-results__stars"
                        star-width="51"
                        star-height="49"
                        rows="2"
                        outof="10"
                    ></div>
                </div>
            </div>
        )
    }
}

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            versusId: props.params.id,
            winner: {title: ''},
            predator: null,
            versus: null
        };
        this.fetch();
    }
    fetch() {
        let payload = {
            api_key: config.apiKey
        };
        let $dfd = $.when(
            $.ajax({
                url: `${config.apiUrl}movie/${this.state.versusId}`,
                method: 'GET',
                dataType: 'jsonp',
                data: payload
            }),
            $.ajax({
                url: `${config.apiUrl}movie/${config.predatorId}`,
                method: 'GET',
                dataType: 'jsonp',
                data: payload
            })
        );
        $dfd.done(this.processResults.bind(this));
    }
    processSingle(result) {
        return {
            title: result.title,
            id: parseInt(result.id, 10),
            rating: parseFloat(result.vote_average),
            date: result.release_date === '' ? null : new Date(result.release_date),
            poster: `${config.posterUrl}${result.poster_path}`
        };
    }
    processResults(versusResult, predatorResult) {
        let versus = this.processSingle(versusResult[0]);
        let predator = this.processSingle(predatorResult[0]);
        let winner = [versus, predator].sort((result) => result.rating)[0];
        this.setState({versus: versus, predator: predator, winner: winner});
    }
    render() {
        let filmNodes = [this.state.predator, this.state.versus].map((film) => {
            if (!this.state.versus || !this.state.predator) return null;
            return (
                <Film
                    title={film.title}
                    id={film.id}
                    key={film.id}
                    rating={film.rating}
                    date={film.date}
                    poster={film.poster}
                / >
            );
        });
        return (
            <div>
                <h1>{this.state.winner.title} wins!</h1>
                <div className="film-results">
                    {filmNodes}
                </div>
                <div className="info">
                    <hr />

                    <h3>Why does this even exist?</h3>

                    <p>Because <a href="http://twitter.com/linssen">Wil</a>, <a href="http://twitter.com/gregwood">Greg</a>,
                        and <a href="http://twitter.com/glenswinfield">Glen</a> were in a pub once
                        and they thought you should be able to compare films to Predator. It is
                        after all the ultimate benchmark.</p>

                    <Link to="/" className="button button--again info__button">
                        Again!
                    </Link>

                    <a className="button button--tweet info__button info__button--last" target="_blank" href="">
                        Tweet this
                    </a>

                    <p className="credit">
                        Copyright © YYYY <a href="http://linssen.me/">Wil Linssen</a>,
                        and all of the code is <a href="http://github.com/linssen/better_than_predator">on GitHub</a>.<br />
                        Powered by <a href="https://www.themoviedb.org/">themoviedb.org</a>.
                    </p>

                </div>
            </div>
        );
    }
}

export default Results
