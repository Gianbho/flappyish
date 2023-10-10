import React, { useRef, useEffect } from "react";
import "./pipe.css";

import BatSprite from "../BatSprite/BatSprite";
import ItemsSprite from "../ItemsSprite/ItemsSprite";

let myInterval;

const Pipe = (props) => {
  const pipeRef = useRef(null);
  const random = Math.random();

  function setRef(ref, random, id) {
    if (!!props.callback) props.callback(ref, random, id);
  }

  function unmountPipe(){
    const rects = pipeRef.current && pipeRef.current.getBoundingClientRect();
    if(rects?.x < (0 - rects?.width) || (pipeRef.current?.style.display === 'none')) props.callbackFinish(props.lane)
  }

  useEffect(() => { 
    myInterval = setInterval(unmountPipe, 500);
    return () => {
      clearInterval(myInterval);
    };
  }, []);


  useEffect(() => {
    setRef(pipeRef?.current, random, props.lane);
    return () => {};
  }, []);

  return (
    <>
      {props.type === "pipe" ? (
        <div 
          ref={pipeRef} 
          className={"notFlappy pipe"} id="pipe">
          <BatSprite />
        </div>
      ) : props.type === "powerUp0" ? (
        <div
          ref={pipeRef}
          className={`notFlappy ${props.type}`}
          id={props.type}
        >
          <ItemsSprite sprite={10} />
        </div>
      ) : props.type === 'powerUp1' ? (
        <div
          ref={pipeRef}
          className={`notFlappy ${props.type}`}
          id={props.type}
        >
          <ItemsSprite sprite={0} />
        </div>
      ) : <></>}
    </>
  );
};

export default Pipe;
