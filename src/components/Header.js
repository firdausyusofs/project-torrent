import { useContext, useState, useEffect } from "react"
import { FaCog, FaChevronDown } from "react-icons/fa"

import { TopBarDropdown, HeaderFilterContainer, HeaderFilterHolder, HeaderFilterTitle, HeaderHolder, HeaderLink, HeaderLinkHolder, HeaderTitle, RightHolder, SearchInput, HeaderTitleHolder, HeaderButton, HeaderButtonHolder } from "../styles/Header"

import MovieContext from "../utils/Context"

import { Genres, Sorts, GetData, type } from "../utils/config"
import { Link } from "react-router-dom"

const remote = window.require('electron').remote;
const ipcRenderer = window.require("electron").ipcRenderer;

function Header({history, location}) {
    const [context, setContext] = useContext(MovieContext)
    const [keywords, setKeywords] = useState("")
    const [platform, setPlatform] = useState("")

    useEffect(() => {
      ipcRenderer.on('platform:info', (evt, args) => {
        setPlatform(args)
      })
    }, [])

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
//setContext(state => ({...state, theme: state.theme === "light" ? "dark" : "light"}))
    return (
        <HeaderHolder>
            <HeaderTitleHolder>
                <HeaderTitle>FlashX</HeaderTitle>
                {platform !== "darwin" && (
                  <HeaderButtonHolder>
                      <HeaderButton onClick={() => {
                          const window = remote.getCurrentWindow();
                          window.minimize(); 
                      }}>
                          <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><rect fill="currentColor" width="10" height="1" x="1" y="6"></rect></svg>
                      </HeaderButton>
                      <HeaderButton onClick={() => {
                          const window = remote.getCurrentWindow();
                          if (!window.isMaximized()) {
                              window.maximize();
                          } else {
                              window.unmaximize();
                          }	 
                      }}>
                          <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><rect width="9" height="9" x="1.5" y="1.5" fill="none" stroke="currentColor"></rect></svg>
                      </HeaderButton>
                      <HeaderButton isClose={true} onClick={() => {
                          const window = remote.getCurrentWindow();
                          window.close(); 
                      }}>
                          <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12"><polygon fill="currentColor" fill-rule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon></svg>
                      </HeaderButton>
                  </HeaderButtonHolder>
                )}
            </HeaderTitleHolder>
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
                    <Link to="/settings"><FaCog color="rgba(255,255,255,.6)" size={20} /></Link>
                </RightHolder>
            </HeaderLinkHolder>
            {location.pathname !== "/settings" && <HeaderFilterHolder>
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
            </HeaderFilterHolder>}
        </HeaderHolder>
    )
}

export default Header
