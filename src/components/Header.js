import { useContext } from "react"

import { HeaderHolder, HeaderLink, HeaderLinkHolder, HeaderTitle, SearchInput } from "../styles/Header"

import MovieContext from "../utils/Context"

function Header({history}) {
    const [context, setContext] = useContext(MovieContext)

    function changeLink(input) {
        setContext(state => ({...state, 'isActive': input}))
        history.push('/')
    }

    return (
        <HeaderHolder>
            <HeaderTitle>Project Torrent</HeaderTitle>
            <HeaderLinkHolder>
                <div>
                    <HeaderLink isActive={context.isActive === 0} onClick={() => changeLink(0)}>
                        Movies
                    </HeaderLink>
                    <HeaderLink isActive={context.isActive === 1} onClick={() => changeLink(1)}>
                        Tv Shows
                    </HeaderLink>
                </div>
                <SearchInput placeholder="Search..." />
            </HeaderLinkHolder>
        </HeaderHolder>
    )
}

export default Header