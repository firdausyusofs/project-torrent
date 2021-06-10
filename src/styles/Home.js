import styled from "styled-components"

export const Wrapper = styled.div`
    padding: 40px;
    background: ${props => props.theme.body};
    position: relative;
`

export const MovieHolder = styled.div`
    // padding: 40px;
    display: grid;
    row-gap: 20px;
    column-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`

export const MovieItem = styled.div`
    // width: 250px;
    min-height: 300px;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
    background: black;
    border-radius: 10px;
    background-image: url(${props => props.image} );
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: 0.25s all ease-in-out;

    &:hover {
        // transform: scale(1.05)
        box-shadow: 0 0 0 3px #fff;
    }
`

export const MovieTitle = styled.div`
    width: 100%;
    padding: 20px;
    background: rgba(0, 0, 0, .7);
    backdrop-filter: blur(10px);
    position: absolute;
    color: #fff;
    bottom: 0;
    left: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    h2 {
        font-size: 20px;
    }
`

export const MovieInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const TopBarHolder = styled.div`
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: ${props => props.theme.color} ;
    }
`

export const TopBar = styled.div`
    display: flex;
    align-items: center;
    
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
            color: ${props => props.theme.color};
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

        &.active {
            color: rgb(227, 64, 62);
        }

        &:hover {
            background: ${props => props.theme.dropdownHighlight};
        }
    }
`

export const NoResultHolder = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-top: 50px;

    h1 {
        color: rgb(134, 134, 134);
        font-weight: 600;
    }
`