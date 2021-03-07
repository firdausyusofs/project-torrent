import { useState, useEffect } from "react"
import { FaArrowLeft, FaStar, FaPlay, FaDownload } from "react-icons/fa"
import { Link } from "react-router-dom"

import {htmlDecode, timeConverter} from "../utils/utils"

import {
    MovieHolder, 
    MovieImage, 
    MovieDetails, 
    MovieBackButton, 
    MovieInfo, 
    MovieStarHolder, 
    MovieButtonHolder, 
    MovieButton,
    MovieTopDetails,
    MovieQualityToggleHolder,
    MovieQualityToggle,
    MovieDetailInner
} from "../styles/Movie"

function Movie({location: {state}, history}) {
    const [isActive, setIsActive]= useState(0)

    if (!state) {
        history.push('/')
        return <></>
    }

    return (
        <MovieHolder>
            <MovieDetails>
                <MovieTopDetails>
                    <MovieBackButton onClick={() => history.goBack()}>
                        <FaArrowLeft color="rgb(184, 186, 185)" />
                        <h3>Back</h3>
                    </MovieBackButton>
                    <MovieDetailInner>
                        <h1>{htmlDecode(state[state.type].title)}</h1>
                        <MovieInfo>
                            <MovieStarHolder>
                                <FaStar color="rgb(248, 205, 75)" />
                                <FaStar color="rgb(248, 205, 75)" />
                                <FaStar color="rgb(248, 205, 75)" />
                                <FaStar color="rgb(248, 205, 75)" />
                                <FaStar color="rgb(248, 205, 75)" />
                            </MovieStarHolder>
                            <p>{state[state.type].year}</p>
                            {state.type === "movie" && <p>{timeConverter(state[state.type].runtime)}</p>}
                            {state.type === "show" && <p>{state[state.type].num_seasons} Seasons</p> }
                            {state[state.type].certification && <p>{state[state.type].certification} rated</p>}
                        </MovieInfo>
                        <p>{state[state.type].synopsis}</p>
                    </MovieDetailInner>
                </MovieTopDetails>
                <MovieButtonHolder>
                    <MovieButton isPlay={true}>
                        <div>
                            <FaPlay color="#fff" />
                        </div>
                        <h3>Play Now</h3>
                    </MovieButton>
                    {state.type === "movie" && <MovieQualityToggleHolder>
                        {Object.keys(state[state.type].torrents.en).reverse().map((k, i) => (
                            <MovieQualityToggle key={i} isActive={isActive === i} onClick={() => setIsActive(i)}>{k}</MovieQualityToggle>
                        ))}
                    </MovieQualityToggleHolder>}
                    <MovieButton isPlay={false}>
                        <div>
                            <FaPlay color="rgb(184, 186, 185)" />
                        </div>
                        <h3>Play Trailer</h3>
                    </MovieButton>
                    <MovieButton isPlay={false}>
                        <div>
                            <FaDownload color="rgb(184, 186, 185)" />
                        </div>
                        <h3>Download</h3>
                    </MovieButton>
                </MovieButtonHolder>
            </MovieDetails>
            <MovieImage src={state[state.type].images.poster} />
        </MovieHolder>
    )
}

export default Movie