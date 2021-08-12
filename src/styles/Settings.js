import styled from "styled-components"

const SettingsHolder = styled.div`
	display: flex;
	width: 100vw;
	// background: blue;
	height: calc(100vh - 100px);
	position: absolute;
	top: 100px;
	// top: -70px;
	// top: -65px;
`

const SettingsSidebar = styled.div`
	width: 20%;
	height: 100%;
`

const SettingsMain = styled.div`
	flex-grow: 1;
	height: 100%;
	padding: 40px;
	background: ${props => props.theme.backShadow};
`

const SettingsTitle = styled.h1`
	color: ${props => props.theme.color};
	font-weight: 500;
`

const SettingsInner = styled.div`
	margin-top: 60px;
`

const SettingsInnerTitle = styled.h3`
	color: ${props => props.theme.color};
	font-weight: 500;
`

const AppearanceHolder = styled.div`
	margin-top: 20px;
	display: flex;
`

const AppearanceInnerHolder = styled.div`
	width: 150px;
	// height: 150px;
	margin-right: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const AppearanceImageHolder = styled.div`
	width: 100%;
	cursor: pointer;
	background: ${props => props.theme.back};
	height: 100px;
	border-radius: 5px;
	box-shadow: ${props => props.active ? '0 0 0 2px ' + props.theme.header : 'none'};
`

const AppearanceTitle = styled.p`
	color: rgb(134,134,134);
	font-weight: 600;
	margin-top: 10px;
`

const FilePathHolder = styled.div`
	margin-top: 20px;
	border-radius: 5px;
	display: flex;
	overflow: hidden;
`

const FilePathInput = styled.input`
	padding: 15px 20px;
	outline: none;
	border: none;
	width: 300px;
	background: ${props => props.theme.back}; 
	color: rgb(134,134,134);
`

const FilePathButton = styled.button`
	padding: 15px;
	border: none;
	outline: none;
	font-weight: 600;
	cursor: pointer;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	color: ${props => props.theme.color};
	background: ${props => props.theme.search};
`

export default {
	SettingsHolder,
	SettingsMain,
	SettingsSidebar,
	SettingsTitle,
	SettingsInner,
	SettingsInnerTitle,
	AppearanceHolder,
	AppearanceInnerHolder,
	AppearanceImageHolder,
	AppearanceTitle,
	FilePathHolder,
	FilePathInput,
	FilePathButton
}