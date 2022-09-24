import React, { useEffect, useState } from "react";
import { Howl, Howler } from "howler";
import { useMediaQuery } from "react-responsive";
//events
import eventsBus from "../../events/eventsBus-1";

//componets class
import Sprite from "../Sprite";
//image player
import adventurerRun from "../../assets/player/_Run.png";
import adventurerHit from "../../assets/player/_Hit.png";
import adventurerDeath from "../../assets/player/_Death.png";
//sound
import footstep from "../../assets/sound/Footstep.mp3";
import hit from "../../assets/sound/hit1.mp3";
import die from "../../assets/sound/die1.mp3";

const footstepSound = new Howl({
  src: [footstep],
  loop: true,
  volume: 0.05,
});
const hitSound = new Howl({
  src: [hit],
  volume: 0.05,
});
const deathSound = new Howl({
  src: [die],
  volume: 0.05,
});

const tileAdventurerRun = { width: 120, height: 80 };
let timeoutRun;

function MainSprite() {
  const [state, setState] = useState({
    showAnim: adventurerRun,
    stateAnim: 10,
    oneAnim: false,
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1200px)" });

  useEffect(() => {
    footstepSound.play();
    eventsBus.on("hitContact", hitAnim);
    eventsBus.on("die", deathAnim);
    changeAnim(adventurerRun, 10, false);
    return () => {
      eventsBus.remove("hitContact", () => {});
      eventsBus.remove("die", () => {});
      footstepSound.stop();
      clearTimeout(timeoutRun);
    };
  }, []);

  function deathAnim() {
    eventsBus.remove("die", () => {});
    deathSound.play();
    footstepSound.pause();
    changeAnim(adventurerDeath, 10, true);
    clearTimeout(timeoutRun);
  }

  function hitAnim() {
    console.log("asdasdasdasdsa");
    hitSound.play();
    footstepSound.pause();
    changeAnim(adventurerHit, 1, true);

    timeoutRun = setTimeout(() => {
      changeAnim(adventurerRun, 10, false);
      footstepSound.play();
    }, 500);
  }

  function changeAnim(animImg, stateA, oneA) {
    //console.log("setState", animImg);
    setState({
      showAnim: animImg,
      stateAnim: stateA,
      oneAnim: oneA,
    });
  }

  return (
    <>
      {/* {console.log("render", state)} */}
      <Sprite
        src={state.showAnim}
        states={state.stateAnim}
        tile={tileAdventurerRun}
        scale={isBigScreen ? 8 : 3}
        framesPerStep={10}
        stopAnim={state.oneAnim}
        sprite={0}
        left={-50}
      ></Sprite>
    </>
  );
}
export default MainSprite;
