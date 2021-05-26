import { useContext, useState } from "react"
import { FaCog } from "react-icons/fa"

import { HeaderHolder, HeaderLink, HeaderLinkHolder, HeaderTitle, RightHolder, SearchInput } from "../styles/Header"

import MovieContext from "../utils/Context"

function Header({history}) {
    const [context, setContext] = useContext(MovieContext)
    const [keywords, setKeywords] = useState("")

    function changeLink(input) {
        setContext(state => ({...state, 'isActive': input, search: state.search === false ? false : null}))
        setKeywords("")
        history.push('/')
    }

    function onSearch(e) {
        if (e.key === 'Enter') {
            setContext(state => ({...state, search: keywords}))
        }
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
                <RightHolder>
                    <SearchInput placeholder="Search..." onChange={e => setKeywords(e.target.value)} value={keywords} onKeyDown={onSearch} />
                    <FaCog color="rgba(255,255,255,.6)" size={20} onClick={() => setContext(state => ({...state, theme: state.theme === "light" ? "dark" : "light"}))} />
                </RightHolder>
            </HeaderLinkHolder>
        </HeaderHolder>
    )
}

export default Header