import { createGlobalStyle } from "styled-components"

export const lightTheme = {
    body: "#fff",
    header: "rgb(227, 64, 62)",
    color: "rgb(31, 33, 32)",
    dropdown: "#e9e9e9",
    dropdownHighlight: "#dadada",
    search: "#ffffff",
    back: "#f3f3f3",
    backHighlight: "#fff",
    backShadow: "rgba(0,0,0,.1)",
    circle: "#d9d9d9",
    episode: "rgba(243,243,243,.7)",
    // subtitle: "rgb(31, 33, 32)"
}

export const darkTheme = {
    body: "#111",
    header: "#882625",
    color: "rgba(255,255,255,.85)",
    dropdown: "#292929",
    dropdownHighlight: "#414141",
    search: "#111",
    back: "#414141",
    backHighlight: "#111",
    backShadow: "#222",
    circle: "#292929",
    episode: "rgba(12,12,12,.7)",
}

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${props => props.theme.body};
    }
`