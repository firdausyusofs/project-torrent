import { symlink } from "fs"
import styled from "styled-components"

export const HeaderHolder = styled.div`
    height: 100px;
    width: 100%;
    background: ${props => props.theme.header};
    // background: #882625;
    -webkit-app-region: drag;
    position: fixed;
    top: 0;
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
    position: absolute;
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