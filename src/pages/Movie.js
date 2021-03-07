import { useState, useEffect, useContext } from "react"
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

import TorrentDetail from "../components/TorrentDetail"

const ipcRenderer = window.require('electron').ipcRenderer

function Movie({location: {state}, history}) {
    const [isActive, setIsActive]= useState(0)
    const [isPlaying, setIsPlaying]= useState(false)
    const [downloadPercentage, setDownloadPercentage] = useState(0)
    const [isConnecting, setIsConnecting] = useState(true)

    useEffect(() => {
        ipcRenderer.on('torrent:info', (evt, args) => {
            setIsConnecting(false)
            setDownloadPercentage(args*100)
        })

        ipcRenderer.on('torrent:play', (evt, args) => {
            setIsPlaying(false)
            setIsConnecting(true)
            history.push({pathname: '/player', state: {url: args}})
        })
    }, [])

    if (!state) {
        history.push('/')
        return <></>
    }

    const playTorrent = () => {
        setIsPlaying(true)
        ipcRenderer.send('start:torent', state[state.type].torrents.en[Object.keys(state[state.type].torrents.en)[isActive]].url)
    }

    const stopTorrent = () => {
        setIsPlaying(false)
        ipcRenderer.send('stop:torrent', null)
    }

    return (
        <MovieHolder>
            {isPlaying && <TorrentDetail stopTorrent={stopTorrent} isConnecting={isConnecting} downloadPercentage={downloadPercentage} />}
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
                    <MovieButton isPlay={true} onClick={playTorrent}>
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