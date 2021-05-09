function Player({location: {state}, history}) {

    if (!state) {
        history.push('/')
        return <></>
    }

    return (
        <div id="video-player">
            <video src={state.vidUrl} preload="auto" controls autoPlay>
                <source src={state.vidUrl} type="video/mp4" />
                {/* <track label="English" kind="subtitles" srclang="en" src={state.subUrl} default /> */}
            </video>
        </div>
    )
}

export default Player