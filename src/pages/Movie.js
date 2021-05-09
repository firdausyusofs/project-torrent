import { useState, useEffect, useContext } from "react"
import { FaArrowLeft, FaStar, FaPlay, FaDownload, FaListUl, FaChevronDown, FaTimes, FaChevronUp } from "react-icons/fa"
import { Link } from "react-router-dom"
import axios from "axios"

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
    MovieDetailInner,
    EpisodesHolder,
    TopBarEpisode,
    SeasonTitle,
    SeasonDropdown,
    EpisodeList,
    Episode,
    QualitySelector
} from "../styles/Movie"

import TorrentDetail from "../components/TorrentDetail"
import Loading from "../components/Loading"

const shell = window.require('electron').shell;
const ipcRenderer = window.require('electron').ipcRenderer

// const ipcRenderer = null

function Movie({location: {state}, history}) {
    const [isActive, setIsActive]= useState(0)
    const [isPlaying, setIsPlaying]= useState(false)
    const [downloadPercentage, setDownloadPercentage] = useState(0)
    const [isConnecting, setIsConnecting] = useState(true)
    const [show, setShow] = useState({})
    const [isEpisodeListActive, setIsEpisodeListActive] = useState(false)
    const [selectedEp, setSelectedEp] = useState(1)
    const [selectedSeasonDropdown, setSelectedSeasonDropdown] = useState(1)
    const [selectedSeason, setSelectedSeason] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    // const [minSeason, setMinSeason] = useState(null)
    // const [maxSeason, setMaxSeason] = useState(null)
    const [seasons, setSeasons] = useState([])

    useEffect(() => {
        ipcRenderer.on('torrent:info', (evt, args) => {
            setIsConnecting(false)
            setDownloadPercentage(args*100)
        })

        ipcRenderer.on('torrent:play', (evt, args) => {
            setIsPlaying(false)
            setIsConnecting(true)
            history.push({pathname: '/player', state: args})
        })

        if (state !== undefined && state.type === "show") {
            setIsLoading(true)
            axios.get(`https://project-time.herokuapp.com/show/${state[state.type].imdb_id}`, {
                headers: {
                    'content-type': 'application/json',
                    // 'Access-Control-Allow-Origin': '*'
                    // 'Access-Control-Allow-Origin': true,
                    // 'User-Agent': 'PostmanRuntime/7.26.10',
                    // 'Accept': '*/*',
                }
            })
            .then(res => {
                setShow(res.data.data)

                var first = res.data.data.episodes.sort((a, b) => a.season - b.season || a.episode - b.episode)
                
                if (first.length > 0) {
                    setSelectedEp(first[0].episode)
                    setSelectedSeason(first[0].season)
                    setSelectedSeasonDropdown(first[0].season)
                    // setMinSeason(first[0].season)
                    // setMaxSeason(first[first.length].season)xz
                    // alert(first[].season)
                    for (var j = first[0].season; j <= first[first.length-1].season; j++) {
                        // const seasonArr = seasons
                        // seasonArr.push(j)
                        // setSeasons(seasonArr)
                        setSeasons(state => [...state, j])
                    }
                }
                
                setIsLoading(false)
                // if (isLoadMore) {
                //     var data = context[type[context.isActive]]
            
                //     res.data.data.forEach(d => {
                //         var check = data.filter(a => a.title === d.title).length
            
                //         if(!check) {
                //             data.push(d)
                //         }
                //     })
            
                //     setContext(state => ({...state, [type[context.isActive]]: data, [`${type[context.isActive].slice(0, -1)}Page`]: state[`${type[context.isActive].slice(0, -1)}Page`]+1}))
                // } else {
                //     setIsLoading(false)
                //     setContext(state => ({...state, [type[context.isActive]]: res.data.data, [`${type[context.isActive].slice(0, -1)}Page`]: isFilter ? 1 : state[`${type[context.isActive].slice(0, -1)}Page`]+1}))
                // }
            })
            .catch(err => {
                setIsLoading(false)
                console.log(err)
            })
        }
    }, [])

    if (!state) {
        history.push('/')
        return <></>
    }

    const playTorrent = () => {
        setIsPlaying(true)
        
        let _url

        if (state.type === "movie") {
            _url = state[state.type].torrents.en[Object.keys(state[state.type].torrents.en).sort((a, b) => a.slice(0, -1) - b.slice(0, -1))[isActive]].url
        } else {
            _url = getQuality().torrents[Object.keys(getQuality().torrents).sort((a, b) => a.slice(0, -1) - b.slice(0, -1))[isActive]].url
        }

        ipcRenderer.send('start:torent', _url)
    }

    const stopTorrent = () => {
        setIsPlaying(false)
        ipcRenderer.send('stop:torrent', null)
    }

    const getEpisodesForSeason = (season) => {
        const filter =  show.episodes.filter(a => a.season === season)

        return filter.sort((a, b) => a.episode - b.episode)
    }

    const getQuality = () => {
        console.log(show.episodes.filter(a => a.episode === selectedEp && a.season === selectedSeason))
        return show.episodes.filter(a => a.episode === selectedEp && a.season === selectedSeason)[0]
    }

    // getEpisodesForSeason(1)

    return (
        <MovieHolder>
            {isLoading && <Loading />}
            {isPlaying && <TorrentDetail stopTorrent={stopTorrent} isConnecting={isConnecting} downloadPercentage={downloadPercentage} />}
            {!isLoading && (
            <>
                <MovieDetails>
                    <MovieTopDetails>
                        <MovieBackButton onClick={() => history.push({pathname: '/', state: {isBack: true}})}>
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
                            <p>{state.type === "movie" ? state[state.type].synopsis : show.synopsis}</p>
                        </MovieDetailInner>
                    </MovieTopDetails>
                    <MovieButtonHolder>
                        <MovieButton isPlay={true} onClick={playTorrent}>
                            <span>
                                <div className="circle">
                                    <FaPlay color="#fff" />
                                </div>
                                <h3>Play {state.type === "movie" ? "Now" : `S${selectedSeason}  EP${selectedEp} `}</h3>
                            </span>
                            <div className="circle selector">
                                <FaChevronUp color="#333" size={20} />
                            </div>
                            {state.type === "show" && <QualitySelector>
                                <MovieQualityToggleHolder>
                                    {Object.keys(show).length > 0 && Object.keys(getQuality().torrents).sort((a, b) => a.slice(0, -1) - b.slice(0, -1)).map((quality, idx) => {
                                        if (quality !== "0")
                                            return <MovieQualityToggle key={idx} isActive={isActive === idx-1} onClick={(e) => {e.stopPropagation(); setIsActive(idx-1)}}>{quality}</MovieQualityToggle>
                                    })}
                                </MovieQualityToggleHolder>
                            </QualitySelector>}
                        </MovieButton>
                        {state.type === "show" && (
                            <MovieButton isPlay={false} onClick={() => setIsEpisodeListActive(state => !state)} isActive={isEpisodeListActive}>
                                <span>
                                    <div className="circle">
                                        <FaListUl color="rgb(184, 186, 185)" />
                                    </div>
                                    <h3>All Episodes</h3>
                                </span>
                            </MovieButton>
                        )}
                        {state.type === "movie" && <MovieQualityToggleHolder>
                            {Object.keys(state[state.type].torrents.en).sort((a, b) => a.slice(0, -1) - b.slice(0, -1)).map((k, i) => (
                                <MovieQualityToggle key={i} isActive={isActive === i} onClick={() => setIsActive(i)}>{k}</MovieQualityToggle>
                            ))}
                        </MovieQualityToggleHolder>}
                        <MovieButton isPlay={false} onClick={() => shell.openExternal(state[state.type].trailer)}>
                            <span>
                                <div className="circle">
                                    <FaPlay color="rgb(184, 186, 185)" />
                                </div>
                                <h3>Play Trailer</h3>
                            </span>
                        </MovieButton>
                        <MovieButton isPlay={false}>
                            <span>
                                <div className="circle">
                                    <FaDownload color="rgb(184, 186, 185)" />
                                </div>
                                <h3>Download</h3>
                            </span>
                        </MovieButton>
                    </MovieButtonHolder>
            </MovieDetails>
            <div class="movie-right-holder">
                <EpisodesHolder isActive={isEpisodeListActive}>
                    <TopBarEpisode>
                        <SeasonTitle>
                            <h3>Season {selectedSeasonDropdown}</h3>
                            <FaChevronDown color="#aaa" />
                            <SeasonDropdown>
                                {/* {[...Array(state[state.type].num_seasons)].map((e, idx) => ( */}
                                {seasons.map((season, idx) => (
                                    <p className={selectedSeasonDropdown === season ? 'active' : ''} key={idx} onClick={() => setSelectedSeasonDropdown(season)}>Season {season}</p>
                                ))}
                            </SeasonDropdown>
                        </SeasonTitle>
                        <FaTimes size={25} onClick={() => setIsEpisodeListActive(false)} />
                    </TopBarEpisode>
                    <EpisodeList>
                        {Object.keys(show).length > 0 && getEpisodesForSeason(selectedSeasonDropdown).map((episode, idx) => (
                            <Episode key={idx} isActive={episode.episode === selectedEp && episode.season === selectedSeason} onClick={() => {
                                setSelectedEp(episode.episode)
                                setSelectedSeason(episode.season)
                                setIsEpisodeListActive(false)
                            }}>
                                <div className="circle">{episode.episode}</div>
                                <h3>{htmlDecode(episode.title)}</h3>
                            </Episode>
                        ))}
                        {/* <Episode>
                            <div className="circle">1</div>
                            <h3>Testing episode</h3>
                        </Episode> */}
                    </EpisodeList>
                </EpisodesHolder>
                <MovieImage src={state[state.type].images.poster} />
            </div>
        </>
        )}
        </MovieHolder>
    )
}

export default Movie