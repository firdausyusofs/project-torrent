function Player({location: {state}, history}) {

    if (!state) {
        history.push('/')
        return <></>
    }

    return (
        <div id="video-player">
            <video src={state.url} controls autoPlay></video>
        </div>
    )
}

export default Player