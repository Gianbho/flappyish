//css
import "./App.css";

import { Route, Routes } from "react-router-dom";

//screen
import Start from "./screens/start/Start";
import Game from "./screens/Game";
import GameResults from "./screens/GameResult/GameResult";

import React, {useState} from "react";

//components class

//componet functional

function App() {

  const [tutorial, setTutorial] = useState(false);

  const callbackTutorial = () => {
    setTutorial(true);
  }


  return (
    <div className="App">
      {}
      <Routes>
        <Route path={"/"} element={<Start callback={callbackTutorial} />} />
        <Route path={"game"} element={<Game tutorial={tutorial} />} />
        <Route path={"gameResults"} element={<GameResults />} />
        <Route path={"*"} element={<Start callback={callbackTutorial} />} />
      </Routes>
      {/* <MediaQuery orientation="landscape">
        <Game />
      </MediaQuery>
      <MediaQuery orientation="portrait">
        <PortraitScreen />
      </MediaQuery> */}
    </div>
  );
}

export default App;
