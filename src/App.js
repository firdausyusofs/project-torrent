import { useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/App.sass";

import MovieContext from "./utils/Context";

import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Player from "./pages/Player";
import Settings from "./pages/Settings"

import Header from "./components/Header";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme, GlobalStyles } from "./components/Theme"

const ipcRenderer = window.require("electron").ipcRenderer;

function App() {
    const [settings, setSettings] = useState({})

    const [context, setContext] = useState({
      movies: [],
      shows: [],
      isActive: 0,
      moviePage: 1,
      showPage: 1,
      sort: "Trending",
      genre: "All",
      search: false,
      theme: "",
      path: ""
    });

    useEffect(() => {
      ipcRenderer.on('settings:load', (evt, args) => {
        setContext(state => ({...state, ["theme"]: args.theme, ["path"]: args.path}))
      })
    }, [])

  return (
    <MovieContext.Provider value={[context, setContext]}>
      <ThemeProvider theme={context.theme === "light" ? lightTheme : darkTheme}>
        <Router>
          <Route
            render={(props) => (
              <>
                <GlobalStyles />
                <Header {...props} />
                <div className="App">
                  <Switch>
                    <Route path="/" component={Home} exact />
                    {/* <Route path="/movie/:id" component={Movie} exact /> */}
                    <Route path="/player" component={Player} exact />
                    <Route path="/settings" component={Settings} exact />
                  </Switch>
                </div>
              </>
            )}
          />
        </Router>
      </ThemeProvider>
    </MovieContext.Provider>
  );
}

export default App;
