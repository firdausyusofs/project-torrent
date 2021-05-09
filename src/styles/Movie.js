import styled from "styled-components"

export const MovieHolder = styled.div`
    display: flex;
    max-height: calc(100vh - 100px);
`

export const MovieDetails = styled.div`
    flex-grow: 1;
    box-shadow: 10px 0 40px rgba(0,0,0,.2);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: calc(100vh - 100px);
    animation-name: fade-in;
    animation-duration: 0.5s;
    // animation-delay: 0.5s;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
    opacity: 0;
    
    h1 {
        font-size: 3em;
        margin-bottom: 20px;
        color: rgb(31, 33, 32)
    }

    p {
        color: rgb(134, 134, 134);
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
`

export const MovieTopDetails = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 100%;
    align-items: flex-start;
    flex-grow: 1;
`

export const MovieDetailInner = styled.div`
    flex-grow: 1;
    overflow: scroll;
    max-height: 100%;
    // margin-left: 100%;
`

export const MovieImage = styled.img`
    max-height: calc(100vh - 100px);
    // position: absolute;
    // right: 0;
    // animation-name: move-left;
    // animation-duration: 0.5s;
    // animation-timing-function: cubic-bezier(0.950, 0.050, 0.795, 0.035);;
    // top: 0;
    z-index: -1;
    // margin-left: 100%;

    @keyframes move-left {
        0% {
            margin-left: 100%;
        }

        100% {
            margin-left: 0;
        }
    }
`

export const MovieBackButton = styled.div`
    display: flex;
    margin-bottom: 20px;
    cursor: pointer;
    width: auto;
    border-radius: 30px;
    align-items: center;
    padding: 15px 20px;
    background: #f3f3f3;
    transition: all 0.25s ease-in-out;

    h3 {
        margin-left: 15px;
        color: rgb(31, 33, 32);
    }

    &:hover {
        box-shadow: 0 0 15px rgba(0,0,0,.1);
        background: white;
    }
`

export const MovieInfo = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    p {
        color: rgb(31, 33, 32);
        line-height: auto;
        font-weight: bold;
        margin-right: 10px;
    }
`

export const MovieStarHolder = styled.div`
    margin-right: 10px;

    svg {
        margin-right: 5px;
    }
`

export const MovieButtonHolder = styled.div`
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    // background: red;
    width: 100%;
    row-gap: 20px;
    column-gap: 20px;
`

export const QualitySelector = styled.div`
    // width: 70%;
    // height: 200px;
    padding: 15px;
    background: #fff;
    position: absolute;
    box-shadow: 0 0 15px rgba(0,0,0,.1);
    bottom: calc(100% + 20px);
    left: 50%;
    border-radius: 15px;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.25s ease-in-out;
`

export const MovieButton = styled.div`
    padding: 20px 25px;
    background: #f3f3f3;
    transition: all 0.25s ease-in-out;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;

    span {
        display: flex;
        align-items: center;
    }

    .circle {
        padding: 12px;
        background: ${props => props.isPlay ? 'rgb(227, 64, 62)' : 'transparent'};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;

        &.selector {
            background: #d9d9d9;
        }
    }

    h3 {
        color: rgb(31, 33, 32);
        margin-left: 10px;
        font-weight: 500;
    }

    &:hover {
        box-shadow: 0 0 15px rgba(0,0,0,.1);
        background: white;

        ${QualitySelector} {
            opacity: 1;
            visibility: visible;
        }
    }

    ${props => props.isActive ? `
        box-shadow: 0 0 15px rgba(0,0,0,.1);
        background: white;
    `: ``}
`

export const MovieQualityToggleHolder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const MovieQualityToggle = styled.p`
    padding: 10px 15px;
    margin-right: 10px;
    background: ${props => props.isActive ? 'rgb(227, 64, 62)' : ''};
    color: ${props => props.isActive ? '#fff' : 'rgb(31, 33, 32)'} !important;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.25s ease-in-out;

    ${props => !props.isActive && 
        `&:hover {
            // box-shadow: 0 0 15px rgba(0,0,0,.1);
            background: #F3F3F3;
        }`
    }

    &:last-child {
        margin: 0;
    }

`

export const EpisodesHolder = styled.div`
    // min-width: 100%:
    // flex-basis: 30%;
    width: 100%;
    // height: 100vh;
    height: 100%;
    // background: #f5f5f5;
    background: rgba(243,243,243,.7);
    backdrop-filter: blur(10px);
    overflow: auto;
    z-index: 500;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 30px;
    transition: all 0.25s ease-in-out;

    ${props => !props.isActive ? `
        opacity: 0;
        visibility: hidden;
    ` : `
        opacity: 1;
        visibility: visible;
    `}
`

export const TopBarEpisode = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
        cursor: pointer;
    }
`

export const SeasonTitle = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    &:hover {

        div {
            visibility: visible;
            opacity: 1;
        }
    }

    h3 {
        font-weight: 600;
        color: rgb(31, 33, 32);
        margin-right: 10px;
    }
`

export const SeasonDropdown = styled.div`
    width: 250px;
    max-height: 300px;
    overflow: auto;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: calc(100% + 10px);
    transition: all 0.25s ease-in;
    left: 0;
    opacity: 0;
    visibility: hidden;
    box-shadow: 0 0 15px rgba(0,0,0,.1);

    p {
        padding: 10px 15px;
        margin: 10px;
        transition: all 0.25s ease-in-out;
        border-radius: 10px;

        &.active {
            color: rgb(227, 64, 62);
        }

        &:hover {
            background: #e9e9e9;
        }
    }
`

export const EpisodeList = styled.div`
    margin-top: 20px;
    // background: red;
    flex-grow: 1;
`

export const Episode = styled.div`
    padding: 10px 15px;
    background: #fff;
    display: flex;
    align-items: center;
    width: 100%;
    // box-shadow: 0 0 15px rgba(0,0,0,.1);
    border-radius: 15px;
    margin-top: 20px;
    color: rgb(31, 33, 32);
    // max-height: 100%;
    cursor: pointer;

    h3 {
        font-weight: 500;
        font-size: 17px;
        color: ${props => props.isActive ? "rgb(227, 64, 62)" : ""}
    }

    .circle {
        width: 30px;
        height: 30px;
        background: ${props => props.isActive ? "rgb(227, 64, 62)" : "#ccc"};
        border-radius: 100%;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.isActive ? "#fff" : "rgb(31, 33, 32)"};
        font-weight: 600;
    }

    &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,.1);
    }
`