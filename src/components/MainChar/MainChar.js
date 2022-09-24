import React, { useRef, useEffect } from "react";
import "./mainChar.css";
import MainSprite from "../MainSprite/MainSprite";

const MainChar = (props) => {
  const birdRef = useRef(null);

  /*   const classes = [
    "flappy flappy-animation-1",
    "flappy flappy-animation-2",
    "flappy flappy-animation-3",
  ]; */

  const classes = [
    [
      ["flappy flappy-animation-1 flappy-animation-4"],
      ["flappy flappy-animation-1 flappy-animation-5"],
      ["flappy flappy-animation-1 flappy-animation-6"],
      ["flappy flappy-animation-1 flappy-animation-7"],
      ["flappy flappy-animation-1 flappy-animation-8"],
    ],
    [
      ["flappy flappy-animation-2 flappy-animation-4"],
      ["flappy flappy-animation-2 flappy-animation-5"],
      ["flappy flappy-animation-2 flappy-animation-6"],
      ["flappy flappy-animation-2 flappy-animation-7"],
      ["flappy flappy-animation-2 flappy-animation-8"],
    ],
    [
      ["flappy flappy-animation-3 flappy-animation-4"],
      ["flappy flappy-animation-3 flappy-animation-5"],
      ["flappy flappy-animation-3 flappy-animation-6"],
      ["flappy flappy-animation-3 flappy-animation-7"],
      ["flappy flappy-animation-3 flappy-animation-8"],
    ],
  ];

  function setRef(ref) {
    if (!!props.callback) props.callback(ref);
  }

  useEffect(() => {
    setRef({ ref: birdRef?.current });
    //console.log(birdRef?.current);
  }, []);

  return (
    <div
      ref={birdRef}
      className={classes[props.position.positionY][props.position.positionX]}
      id="flappy"
    >
      <MainSprite></MainSprite>
    </div>
  );
};

export default MainChar;
