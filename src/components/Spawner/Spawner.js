import React, { useState, useEffect } from "react";
import Pipe from "../Pipe/Pipe";

const Spawner = (props) => {
  const [myInterval, setMyInterval] = useState(null);

  const [state, setState] = useState({
    willSpawn: false,
    type: null,
  });

  const [pipe, setPipe] = useState(null);

  const renderElem = () => {
    let randomElem = Math.random();
    let tempState = {};
    if (0 <= randomElem && randomElem <= 0.1) {
      tempState.willSpawn = true;
      tempState.type = "powerUp0";
    } else if (0.1 < randomElem && randomElem <= 0.2) {
      tempState.willSpawn = true;
      tempState.type = "powerUp1";
    } else if (0.2 < randomElem && randomElem <= 0.45) {
      tempState.willSpawn = false;
      tempState.type = "none";
    } else {
      tempState.willSpawn = true;
      tempState.type = "pipe";
    }
    setState(tempState);
  };

  useEffect(() => {
    sendInfo(pipe, props.id);
  }, [pipe]);

  useEffect(() => {
    setMyInterval(setInterval(renderElem, 2200));
    return () => {
      setState({ ...state, willSpawn: false });
      clearInterval(myInterval);
    };
  }, []);

  function sendInfo(info, id) {
    if (!!props.callback) props.callback(info, id);
  }

  function getInfo(elem, random) {
    setPipe({ ref: elem, id: random });
  }
  return (
    <>{state.willSpawn && <Pipe callback={getInfo} type={state.type} />}</>
  );
};

export default Spawner;
