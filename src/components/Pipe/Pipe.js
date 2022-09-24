import React, { useRef, useEffect } from "react";
import "./pipe.css";

import BatSprite from "../BatSprite/BatSprite";
import ItemsSprite from "../ItemsSprite/ItemsSprite";

const Pipe = (props) => {
  const pipeRef = useRef(null);
  const random = Math.random();

  function setRef(ref, id) {
    if (!!props.callback) props.callback(ref, id);
  }

  useEffect(() => {
    setRef(pipeRef?.current, random);
    return () => {};
  }, []);

  return (
    <>
      {props.type === "pipe" ? (
        <div ref={pipeRef} className={"notFlappy pipe"} id="pipe">
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
      ) : (
        <div
          ref={pipeRef}
          className={`notFlappy ${props.type}`}
          id={props.type}
        >
          <ItemsSprite sprite={0} />
        </div>
      )}
    </>
  );
};

export default Pipe;
