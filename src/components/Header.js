import { useContext, useState } from "react"
import { FaCog, FaChevronDown } from "react-icons/fa"

import { TopBarDropdown, HeaderFilterContainer, HeaderFilterHolder, HeaderFilterTitle, HeaderHolder, HeaderLink, HeaderLinkHolder, HeaderTitle, RightHolder, SearchInput } from "../styles/Header"

import MovieContext from "../utils/Context"

import { Genres, Sorts, GetData, type } from "../utils/config"

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
            <HeaderFilterHolder>
                <HeaderFilterTitle>{context.isActive === 0 ? "Movies" : "TV Shows"}</HeaderFilterTitle>
                <HeaderFilterContainer>
                    <div class="inner-top-bar">
                        <p>{context.sort}</p>
                        <FaChevronDown color="rgba(255,255,255,.85)" />
                        <TopBarDropdown>
                            {Sorts.map((sort, idx) => (
                            <p
                                onClick={() => {
                                setContext((state) => ({ ...state, sort }));
                                // setIsBack(false);
                                }}
                                className={context.sort === sort ? "active" : ""}
                                key={idx}
                            >
                                {sort}
                            </p>
                            ))}
                        </TopBarDropdown>
                    </div>
                    <div class="inner-top-bar">
                    <p>
                        {context.genre} {context.genre === "All" ? "categories" : ""}
                    </p>
                    <FaChevronDown color="rgba(255,255,255,.85)" />
                    <TopBarDropdown>
                        {Genres.map((genre, idx) => (
                        <p
                            onClick={() => {
                            setContext((state) => ({ ...state, genre }));
                            // setIsBack(false);
                            }}
                            className={context.genre === genre ? "active" : ""}
                            key={idx}
                        >
                            {genre}
                        </p>
                        ))}
                    </TopBarDropdown>
                    </div>
                </HeaderFilterContainer>
            </HeaderFilterHolder>
        </HeaderHolder>
    )
}

export default Header