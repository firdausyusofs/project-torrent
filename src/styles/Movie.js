import styled from "styled-components"

export const MovieHolder = styled.div`
    display: flex;
    max-height: calc(100vh - 108px);
    position: fixed;
    background: ${props => props.theme.body};
    z-index: 1000;
    top: 108px;
    left: 0;

    .background-holder {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      background-position: center;
      background-size: cover;
    }
`

export const MovieDetails = styled.div`
    flex-grow: 1;
    box-shadow: 10px 0 40px rgba(0,0,0,.2);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: calc(100vh - 100px);
    // animation-name: fade-in;
    animation-duration: 0.5s;
    // animation-delay: 0.5s;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
    // opacity: 0;
    background-color: ${props => `rgba(${props.theme.bodyRGB}, .6)`};
    backdrop-filter: blur(30px);
    
    h1 {
        font-size: 3em;
        margin-bottom: 20px;
        color: ${props => props.theme.color}; 
    }

    p {
        color: ${props => props.theme.color};
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

    .top-details-bar {
      width: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      .top-details-inner {
        display: flex;
      }
    }
`

export const MovieDetailInner = styled.div`
    flex-grow: 1;
    overflow: auto;
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

export const TrailerButton = styled.div`
    padding: 10px 15px;
    background: ${props => `rgba(${props.theme.bodyRGB}, 0.3)`};
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    margin-left: 10px;

    h3 {
        color: ${props => props.theme.color};
        font-size: 15px;
        margin-left: 10px;
        font-weight: 500;
    }

    span {
        display: flex;
        align-items: center;
    }

    &:hover {
        box-shadow: 0 0 15px ${props => props.theme.backShadow};
        background: ${props => props.theme.backHighlight};
    }
`

export const MovieBackButton = styled.div`
    display: flex;
    cursor: pointer;
    width: auto;
    border-radius: 30px;
    align-items: center;
    padding: 10px 15px;
    background: ${props => `rgba(${props.theme.bodyRGB}, 0.4)`};
    transition: all 0.25s ease-in-out;

    h3 {
        margin-left: 15px;
        color: ${props => props.theme.color};
        font-weight: 500;
        font-size: 15px;
    }

    &:hover {
        box-shadow: 0 0 15px ${props => props.theme.backShadow};
        background: ${props => props.theme.backHighlight};
    }
`

export const MovieInfo = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    p {
        color: ${props => props.theme.color}; 
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
    background: ${props => props.theme.body};
    position: absolute;
    box-shadow: 0 0px 15px ${props => props.theme.backShadow};
    bottom: calc(100%);
    left: 50%;
    border-radius: 15px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0; 
    z-index: 100;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.25s ease-in-out;
`

export const MovieButton = styled.div`
    padding: 15px 25px;
    background: ${props => `rgba(${props.theme.bodyRGB}, 0.4)`};
    transition: all 0.25s ease-in-out;
    border-radius: 10px;
    opacity: ${props => props.isDisable ? 0.2 : 1};
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
        background: ${props => props.isPlay ? props.theme.header  : 'transparent'};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;

        &.selector {
            background: ${props => props.theme.circle};
        }
    }

    h3 {
        color: ${props => props.theme.color};
        margin-left: 10px;
        font-weight: 500;
    }
   
    &:hover {
        ${props => props.isDisable ? '' : `box-shadow: 0 0 15px ${props.theme.backShadow}`};
        background: ${props => props.isDisable ? '' : props.theme.backHighlight};

        ${QualitySelector} {
            opacity: 1;
            visibility: visible;
        }
    }


    ${props => props.isActive ? `
        box-shadow: 0 0 15px ${props.theme.backShadow};
        background: ${props.theme.backHighlight};
    `: ``}
`

export const MovieQualityToggleHolder = styled.div`
    display: flex;
    max-width: 100%;
    margin-bottom: -20px;
    //flex-wrap: wrap;
    overflow-x: auto;
    //grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: flex-end;
`

export const MovieQualityToggle = styled.p`
    padding: 10px 15px;
    text-align: center;
    margin-right: 10px;
    background: ${props => props.isActive ? 'rgba(227, 64, 62, .8)' : `rgba(${props.theme.bodyRGB}, .2)`};
    color: ${props => props.isActive ? '#fff' : props.theme.color} !important;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.25s ease-in-out;
    //border: 1px solid rgba(255, 255, 255, .2);

    ${props => !props.isActive && 
        `&:hover {
            // box-shadow: 0 0 15px rgba(0,0,0,.1);
            background: ${props.theme.back} ;
        }`
    }

    &:last-child {
        margin: 0;
    }

`

export const EpisodesHolder = styled.div`
    margin: 20px;
    // min-width: 100%:
    // flex-basis: 30%;
    width: calc(100% - 40px);
    // height: 100vh;
    height: calc(100% - 40px);
    // background: #f5f5f5;
    background: ${props => props.theme.episode};
    backdrop-filter: blur(30px);
    overflow: auto;
    z-index: 500;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 30px;
    transition: all 0.25s ease-in-out;
    border-radius: 30px;

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
        color: ${props => props.theme.color};
        margin-right: 10px;
    }
`

export const SeasonDropdown = styled.div`
    width: 250px;
    max-height: 300px;
    overflow: auto;
    background: ${props => props.theme.dropdown};
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
        color: ${props => props.theme.color};

        &.active {
            color: rgb(227, 64, 62);
        }

        &:hover {
            background: ${props => props.theme.dropdownHighlight};
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
    background: ${props => `rgba(${props.theme.bodyRGB}, .4)`};
    display: flex;
    align-items: center;
    width: 100%;
    // box-shadow: 0 0 15px rgba(0,0,0,.1);
    border-radius: 15px;
    margin-top: 20px;
    color: ${props => props.theme.color};
    // max-height: 100%;
    cursor: pointer;

    h3 {
        font-weight: 500;
        font-size: 17px;
        color: ${props => props.isActive ? "rgb(227, 64, 62)" : ""}
    }

    .circle {
        width: 30px;
        min-width: 30px;
        height: 30px;
        background: ${props => props.isActive ? "rgba(227, 64, 62, .6)" : `rgba(${props.theme.bodyRGB}, .3)`};
        border-radius: 100%;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${props => props.isActive ? "#fff" : props.theme.color};
        font-weight: 600;
    }

    &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,.1);
    }
`
