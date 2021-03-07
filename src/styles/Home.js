import styled from "styled-components"

export const MovieHolder = styled.div`
    padding: 40px;
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
    transition: 0.25s all ease-in-out;

    &:hover {
        transform: scale(1.05)
    }
`

export const MovieTitle = styled.div`
    width: 100%;
    padding: 20px;
    background: rgba(0, 0, 0, .2);
    backdrop-filter: blur(10px);
    color: #fff;

    h2 {
        font-size: 20px;
    }
`

export const MovieInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`