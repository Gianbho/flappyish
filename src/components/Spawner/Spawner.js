import React, { useState, useRef, useEffect } from "react";
import Pipe from "../Pipe/Pipe";

let pipes = [];
const Spawner = (props) => {
  
  const lane0 = useRef(null);
  const lane1 = useRef(null);
  const lane2 = useRef(null);
  
  const [state, setState] = useState({
    willSpawn: false,
    id: 0,
    elements: []
  });
  
  useEffect(() => {
    if(!state.willSpawn) renderElem();
  }, [state.willSpawn])
  
  useEffect(() => {
    sendInfo(pipes);
  }, [state]);

  const renderElem = () => {
    let id = 0;
    let myElements = [];

    while (myElements.length < 3) {
        let randomElem = Math.random().toFixed(2);
        if (0 <= randomElem && randomElem <= 0.1) {
            myElements.push({
                type: "powerUp0",
                id: id,
            });
            id++;
        } else if (0.1 < randomElem && randomElem <= 0.2) {
            myElements.push({
                type: "powerUp1",
                id: id,
            });
            id++;
        } else if (0.2 < randomElem && randomElem <= 0.4) {
            if (!(myElements.length === 2 && (myElements[0].type === 'none' && myElements[1].type === 'none'))) {
                myElements.push({
                    type: "none",
                    id: id,
                });
                id++;
            }
        } else {
            if (!(myElements.length === 2 && (myElements[0].type === 'pipe' && myElements[1].type === 'pipe'))) {
                myElements.push({
                    type: "pipe",
                    id: id,
                });
                id++;
            }
        }
    }

    setState({
        ...state,
        willSpawn: true,
        elements: [...myElements]
    });
  };


  const animFinished = () => {
    setState({
        ...state,
        willSpawn: false
    })
}

  function sendInfo(info, id) {
    if (!!props.callback) props.callback(info, id);
  }

  const getY = (lane) => (e) => {
    const eventRects = e.target.getBoundingClientRect();
    switch(lane){
        case 'lane0':
            lane0.current = {
                y: eventRects.y,
                height: eventRects.height,
            };
            break;
        case 'lane1':
            lane1.current = {
                y: eventRects.y,
                height: eventRects.height,
            };
            break;
        case 'lane2':
            lane2.current = {
                y: eventRects.y,
                height: eventRects.height,
            };   
            break;         
    }
}


  function getInfo(elem, random, lane) {
    //console.log('pipes', pipes)
    if (pipes.length >= 3) pipes = [];
    pipes.push({ ref: elem, id: random, laneId: lane });
}

return (
    <div className="lanes pipe-lanes">
      <span id="3" className="lane pipe-lane" onAnimationStart={getY('lane0')}>
        {state.willSpawn && <Pipe callback={getInfo} pos={lane0.current} callbackFinish={animFinished} lane={0} type={state.elements[0].type} />}
      </span>
      <span id="4" className="lane pipe-lane" onAnimationStart={getY('lane1')}>
        {state.willSpawn && <Pipe callback={getInfo} pos={lane1.current} callbackFinish={animFinished} lane={1} type={state.elements[1].type} />}
      </span>
      <span id="5" className="lane pipe-lane" onAnimationStart={getY('lane2')}>
        {state.willSpawn && <Pipe callback={getInfo} pos={lane2.current} callbackFinish={animFinished} lane={2} type={state.elements[2].type} />}
      </span>
    </div>
);
};

export default Spawner;
