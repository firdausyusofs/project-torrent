import { useState, useEffect, useContext } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import debounce from "lodash.debounce"

import {htmlDecode} from "../utils/utils"

import MovieContext from "../utils/Context"

import {MovieHolder, MovieInfo, MovieItem, MovieTitle} from "../styles/Home"

import Loading from "../components/Loading"

function Home({location: {state}}) {
    const [isLoading, setIsLoading] = useState(false);
    const [context, setContext] = useContext(MovieContext)

    window.onscroll = debounce(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop
            === document.documentElement.offsetHeight
        ) {
            axios.get('http://localhost:5000/movies/2', {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
                // 'Access-Control-Allow-Origin': true,
                // 'User-Agent': 'PostmanRuntime/7.26.10',
                // 'Accept': '*/*',
            }
            })
            .then(res => {
                // setIsLoading(false)
                var movies = context.movies

                res.data.data.forEach(movie => {
                    movies.push(movie)
                })

                setContext(state => ({...state, 'movies': movies}))
            })
            .catch(err => {
                // setIsLoading(false)
                console.log(err)
            })
        }
    }, 100)

    useEffect(() => {
        if (context.movies.length === 0 && context.isActive === 0) {
            setIsLoading(true)
            axios.get('http://localhost:5000/movies/1', {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
                // 'Access-Control-Allow-Origin': true,
                // 'User-Agent': 'PostmanRuntime/7.26.10',
                // 'Accept': '*/*',
            }
            })
            .then(res => {
                setIsLoading(false)
                setContext(state => ({...state, 'movies': res.data.data}))
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
        } else if (context.shows.length === 0 && context.isActive === 1) {
            setIsLoading(true)
            axios.get('http://localhost:5000/shows/1', {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
                // 'Access-Control-Allow-Origin': true,
                // 'User-Agent': 'PostmanRuntime/7.26.10',
                // 'Accept': '*/*',
            }
            })
            .then(res => {
                setIsLoading(false)
                setContext(state => ({...state, 'shows': res.data.data}))
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
        }
    }, [context.isActive])

    return (
        <div>
            {isLoading && <Loading />}
            <MovieHolder>
                {context.movies.length > 0 && context.isActive === 0 && context.movies.map((movie, idx) => (
                    <Link key={idx} title={movie.title} to={{
                        pathname: `/movie/${movie._id}`,
                        state: {movie, type: "movie"}

                    }}>
                        <MovieItem image={movie.images.poster}>
                            <MovieTitle>
                            <h2>{htmlDecode(movie.title, false)}</h2>
                            <MovieInfo>
                                <p>{movie.year}</p>
                                {/* <p>{movie.runtime} mins</p> */}
                                {/* <p>{movie.rating.percentage/10}</p> */}
                            </MovieInfo>
                            </MovieTitle>
                        </MovieItem>
                    </Link>
                ))}
                {context.shows.length > 0 && context.isActive === 1 && context.shows.map((show, idx) => (
                    <Link key={idx} title={show.title} to={{
                        pathname: `/movie/${show._id}`,
                        state: {show, type: "show"}
                    }}>
                        <MovieItem image={show.images.poster}>
                            <MovieTitle>
                            <h2>{htmlDecode(show.title, false)}</h2>
                            <MovieInfo>
                                <p>{show.year}</p>
                                {/* <p>{movie.runtime} mins</p> */}
                                {/* <p>{movie.rating.percentage/10}</p> */}
                            </MovieInfo>
                            </MovieTitle>
                        </MovieItem>
                    </Link>
                ))}
            </MovieHolder>
        </div>
    )
}

export default Home