import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

import Movie from "./Movie";

import { FaChevronDown } from "react-icons/fa";

import { htmlDecode } from "../utils/utils";

import MovieContext from "../utils/Context";

import {
  MovieHolder,
  MovieInfo,
  MovieItem,
  MovieTitle,
  TopBar,
  TopBarDropdown,
  TopBarHolder,
  NoResultHolder,
  Wrapper,
  BottomLoading,
} from "../styles/Home";

import Loading from "../components/Loading";

import { Genres, Sorts, GetData, type } from "../utils/config";

const shell = window.require("electron").shell;
const ipcRenderer = window.require("electron").ipcRenderer;

function Home({ location: { state } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isBack, setIsBack] = useState(
    state !== undefined ? state.isBack : false
  );
  const [context, setContext] = useContext(MovieContext);
  const [data, setData] = useState({});
  const [isLoadingBottom, setIsLoadingBottom] = useState(false)

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setIsLoadingBottom(true)
      GetData(context, setContext, setIsLoadingBottom, true);
    }
  }, 100);

  useEffect(() => {
    if (context[type[context.isActive]].length === 0) {
      setIsLoading(true);
      GetData(context, setContext, setIsLoading, false);
    }

    setData({})
  }, [context.isActive]);

  useEffect(() => {
    // alert("lala");
    // alert(isBack)
    if (!isBack || context.search !== false) {
      setData({})
      // alert("lala");
      setContext((state) => ({
        ...state,
        [type[context.isActive]]: [],
        [`${type[context.isActive].slice(0, -1)}Page`]: 1,
      }));
      if (
        context[type[context.isActive]].length > 0 ||
        context.search !== false
      ) {
        setIsLoading(true);
        GetData(context, setContext, setIsLoading, false, true);
        setContext((state) => ({
          ...state,
          search: context.search ? context.search : false,
        }));
      }
    }
  }, [context.sort, context.genre, context.search]);

  return (
    <Wrapper>
      {Object.keys(data).length > 0 && (
        <Movie
          data={data}
          back={() => {
            setData({});
            document.body.style.overflow = "auto";
          }}
          ipcRenderer={ipcRenderer}
          shell={shell}
        />
      )}
      {isLoading && <Loading />}
      {!isLoading && context[type[context.isActive]].length === 0 && (
        <NoResultHolder>
          <h1>No Results to show</h1>
        </NoResultHolder>
      )}
      {/* {!isLoading && context[type[context.isActive]].length !== 0 && (
        <TopBarHolder>
          <h1>{context.isActive === 0 ? "Movies" : "TV Shows"}</h1>
          <TopBar>
            <div class="inner-top-bar">
              <p>{context.sort}</p>
              <FaChevronDown color="rgb(134, 134, 134)" />
              <TopBarDropdown>
                {Sorts.map((sort, idx) => (
                  <p
                    onClick={() => {
                      setContext((state) => ({ ...state, sort }));
                      setIsBack(false);
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
              <FaChevronDown color="rgb(134, 134, 134)" />
              <TopBarDropdown>
                {Genres.map((genre, idx) => (
                  <p
                    onClick={() => {
                      setContext((state) => ({ ...state, genre }));
                      setIsBack(false);
                    }}
                    className={context.genre === genre ? "active" : ""}
                    key={idx}
                  >
                    {genre}
                  </p>
                ))}
              </TopBarDropdown>
            </div>
          </TopBar>
        </TopBarHolder>
      )} */}
      <MovieHolder>
        {context.movies.length > 0 &&
          context.isActive === 0 &&
          context.movies.map((movie, idx) => (
            // <Link key={idx} title={movie.title} to={{
            //     pathname: `/movie/${movie._id}`,
            //     state: {movie, type: "movie"}

            // }}>
            <MovieItem
              image={movie.images.poster}
              key={idx}
              onClick={() => {
                setData({ movie, type: "movie" });
                document.body.style.overflow = "hidden";
              }}
            >
              <MovieTitle>
                <h2>{htmlDecode(movie.title, false)}</h2>
                <MovieInfo>
                  <p>{movie.year}</p>
                  {/* <p>{movie.runtime} mins</p> */}
                  {/* <p>{movie.rating.percentage/10}</p> */}
                </MovieInfo>
              </MovieTitle>
            </MovieItem>
            // </Link>
          ))}
        {context.shows.length > 0 &&
          context.isActive === 1 &&
          context.shows.map((show, idx) => (
            // <Link
            //   key={idx}
            //   title={show.title}
            //   to={{
            //     pathname: `/movie/${show._id}`,
            //     state: { show, type: "show" },
            //   }}
            // >
            <MovieItem
              image={show.images.poster}
              onClick={() => {
                setData({ show, type: "show" });
                document.body.style.overflow = "hidden";
              }}
              key={idx}
            >
              <MovieTitle>
                <h2>{htmlDecode(show.title, false)}</h2>
                <MovieInfo>
                  <p>{show.year}</p>
                  {/* <p>{movie.runtime} mins</p> */}
                  {/* <p>{movie.rating.percentage/10}</p> */}
                </MovieInfo>
              </MovieTitle>
            </MovieItem>
            // </Link>
          ))}
      </MovieHolder>
      {isLoadingBottom && (
        <BottomLoading> 
          Loading ...
        </BottomLoading>
      )}
    </Wrapper>
  );
}

export default Home;
