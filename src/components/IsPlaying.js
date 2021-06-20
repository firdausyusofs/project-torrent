import React from 'react';

import {FaPlayCircle} from "react-icons/fa"

const IsPlaying = ({title, downloadPercentage}) => {
	return (
		<div class="is-playing-container">
			<div className="is-playing-overlay"></div>
			<div className="is-playing-inner">
				<FaPlayCircle size={100} color="rgba(255,255,255,.4)" />
				<h3>Currently playing {title} on VLC</h3>
				<div className="loading-bar">
					<div className="loading-bar-inner" style={{width: `${downloadPercentage}%`}}></div>
				</div>
				<p className="text">Downloaded: <b>{Math.round(downloadPercentage)}%</b></p>

				<div className="stop-btn">Stop</div>
			</div>
		</div>
	);
};

export default IsPlaying;