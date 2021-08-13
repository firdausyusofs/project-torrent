import React from 'react';
import { FaFolderOpen } from "react-icons/fa"

import MovieContext from "../utils/Context"

import SC from "../styles/Settings"

import light from "../light.jpg"
import dark from "../dark.jpg"

const remote = window.require("electron").remote;

const Settings = () => {
	const [context, setContext] = React.useContext(MovieContext)
	const [path, setPath] = React.useState("");

	return (
		<SC.SettingsHolder>
			<SC.SettingsSidebar></SC.SettingsSidebar>
			<SC.SettingsMain>
				<SC.SettingsTitle>General</SC.SettingsTitle>
				<SC.SettingsInner>
					<SC.SettingsInnerTitle>Appearance</SC.SettingsInnerTitle>
					<SC.AppearanceHolder>
						<SC.AppearanceInnerHolder>
							<SC.AppearanceImageHolder active={context.theme === "light"} onClick={() => setContext(state => ({...state, theme: "light"}))}>
								<img src={light} />
							</SC.AppearanceImageHolder>
							<SC.AppearanceTitle>Light</SC.AppearanceTitle>
						</SC.AppearanceInnerHolder>
						<SC.AppearanceInnerHolder>
							<SC.AppearanceImageHolder active={context.theme === "dark"} onClick={() => setContext(state => ({...state, theme: "dark"}))}>
								<img src={dark} />
							</SC.AppearanceImageHolder>
							<SC.AppearanceTitle>Dark</SC.AppearanceTitle>
						</SC.AppearanceInnerHolder>
					</SC.AppearanceHolder>
				</SC.SettingsInner>
				<SC.SettingsInner>
					<SC.SettingsInnerTitle>Download Path</SC.SettingsInnerTitle>
					<SC.FilePathHolder>
						<SC.FilePathInput value={context.path} disabled />
						<SC.FilePathButton onClick={async () => {
							const dialog = await remote.dialog.showOpenDialog(
								{
									properties: ["openDirectory"]
								}
							);

							// setPath(dialog.filePaths[0])
							setContext(state => ({...state, path: dialog.filePaths[0]}))
						}}><FaFolderOpen size={15} /></SC.FilePathButton>
					</SC.FilePathHolder>
				</SC.SettingsInner>
			</SC.SettingsMain>
		</SC.SettingsHolder>
	);
};

export default Settings;