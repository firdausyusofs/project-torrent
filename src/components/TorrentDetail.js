function TorrentDetail({isConnecting, downloadPercentage, stopTorrent}) {
    return (
        <div id="torrent-detail-modal">
            <div className="torrent-detail">
                <h1>{isConnecting ? 'Connecting...' : 'Downloading...'}</h1>
                {!isConnecting && <div className="loading">
                    {/* <p>lala</p> */}
                    <div className="inner-loading" style={{width: `${downloadPercentage}%`}}>
                        <p>{Math.round(downloadPercentage)}%</p>
                    </div>
                </div>}
                {isConnecting && <div class="lds-ripple"><div></div><div></div></div>}
                <button onClick={stopTorrent}>Cancel</button>
            </div>
        </div>
    )
}

export default TorrentDetail