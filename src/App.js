import {useState} from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"

import "./styles/App.sass"

import MovieContext from './utils/Context';

import Home from "./pages/Home"
import Movie from "./pages/Movie"
import Player from "./pages/Player"

import Header from "./components/Header"

function App() {
  const [context, setContext] = useState({movies: [], shows: [], isActive: 0});

  return (
      <MovieContext.Provider value={[context, setContext]}>
          <Router>
            <Route render={props => (
              <>
                <Header {...props} />
                <div className="App">
                  <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/movie/:id" component={Movie} exact />
                    <Route path="/player" component={Player} exact />
                  </Switch>
                </div>
              </>
            )} />
          </Router>
      </MovieContext.Provider>
  );
}

export default App;
