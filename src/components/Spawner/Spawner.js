import React, { useState, useEffect } from "react";
import Pipe from "../Pipe/Pipe";

let pipe;
let myInterval;
const Spawner = (props) => {

  const [state, setState] = useState({
    willSpawn: false,
    type: null,
    id: 0
  });

  const renderElem = () => {
    let randomElem = Math.random().toFixed(2);
    let tempState = {};
    if (0 <= randomElem && randomElem <= 0.1) {
      tempState.willSpawn = true;
      tempState.type = "powerUp0";
    } else if (0.1 < randomElem && randomElem <= 0.2) {
      tempState.willSpawn = true;
      tempState.type = "powerUp1";
    } else if (0.2 < randomElem && randomElem <= 0.4) {
      tempState.willSpawn = false;
      tempState.type = "none";
    } else {
      tempState.willSpawn = true;
      tempState.type = "pipe";
      tempState.id = state.id + 1;
    }
    setState(tempState);
  };

  useEffect(() => {
    sendInfo(pipe, props.id);
  }, [state]);

  useEffect(() => { 
    myInterval = setInterval(renderElem, 1500);
    return () => {
      setState({ ...state, willSpawn: false });
      clearInterval(myInterval);
    };
  }, []);

  function sendInfo(info, id) {
    if (!!props.callback) props.callback(info, id);
  }

  function getInfo(elem, random) {
    pipe = { ref: elem, id: random };
  }
  return (
    <>{state.willSpawn ? <Pipe callback={getInfo} type={state.type} /> : null}</>
  );
};

export default Spawner;
