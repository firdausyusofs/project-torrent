import { symlink } from "fs"
import styled from "styled-components"

export const HeaderHolder = styled.div`
    // height: 100px;
    width: 100%;
    padding-top: 30px;
    background: ${props => props.theme.header};
    // background: #882625;
    -webkit-app-region: drag;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 1000;
`

export const HeaderTitle = styled.h1`
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
`

export const HeaderLinkHolder = styled.div`
    width: 100%;
    display: flex;
    padding: 20px;
    // position: absolute;
    bottom: 0;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
    }
`

export const HeaderLink = styled.div`
    padding: 0 20px;
    font-weight: 600;
    cursor: pointer;
    font-size: 1.5em;
    transition: color 0.25s ease-in-out;
    color: ${props => props.isActive ? '#fff' : 'rgba(255,255,255,.6)'};

    &:hover {
        color: ${props => props.isActive ? '#fff' : 'rgba(255,255,255,.8)'};
    }
`

export const SearchInput = styled.input`
    border: none;
    border-radius: 30px;
    outline: none;
    padding: 10px 15px;
    width: 250px;
    background: ${props => props.theme.search};
    color: ${props => props.theme.color};
    font-weight: 600;
`

export const RightHolder = styled.div`
    display: flex;
    align-items: center;

    svg {
        margin-left: 15px;
        cursor: pointer;
        transition: fill 0.25s ease-in-out;

        &:hover {
            fill: #fff;
        }
    }
`

export const HeaderFilterHolder = styled.div`
    background: rgba(0,0,0,.1);
    padding: 20px 40px;
    // position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
`

export const HeaderFilterTitle = styled.h3`
    color: #fff;
    font-weight: 600;
`

export const HeaderFilterContainer = styled.div`
    display: flex;

    .inner-top-bar {
        display: flex;
        position: relative;
        align-items: center;
        margin-left: 20px;
        cursor: pointer;

        &:hover {

            div {
                // width: 200px;
                // height: auto;
                opacity: 1;
                visibility: visible;
            }
        }

        svg {
            margin-top: 3px;
            margin-left: 5px;
        }

        p {
            font-weight: 600;
            color: rgba(255,255,255,.85);
        }
    }
`

export const TopBarDropdown = styled.div`
    width: 200px;
    position: absolute;
    // height: 250px;
    background: ${props => props.theme.dropdown};
    border-radius: 15px;
    top: calc(100% + 10px);
    right: 0;
    z-index: 500;
    // width: 0;
    // height: 0;
    opacity: 0;
    transition: all 0.25s ease-in;
    visibility: hidden;
    max-height: 350px;
    overflow: auto;

    p {
        padding: 10px 15px;
        margin: 10px;
        transition: all 0.25s ease-in-out;
        border-radius: 10px;
        color: ${props => props.theme.color} !important;

        &.active {
            color: rgb(227, 64, 62) !important;
        }

        &:hover {
            background: ${props => props.theme.dropdownHighlight};
        }
    }
`