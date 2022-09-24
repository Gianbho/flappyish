import React from "react";
import { useMediaQuery } from "react-responsive";
//componets class
import Sprite from "../Sprite";
//image
import wormRun from "../../assets/worm/Walk.png";

const tileWormRun = { width: 90, height: 43 };

function WormSprite(props) {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

  return (
    <>
      <Sprite
        src={props.src ? props.src : wormRun}
        states={props.states ? props.states : 9}
        tile={tileWormRun}
        scale={
          isBigScreen
            ? (props.scale ? props.scale : 9) : (isPortrait ? 6 : 7)
        }
        framesPerStep={props.framesPerStep ? props.framesPerStep : 10}
        stopAnim={false}
        sprite={0}
      ></Sprite>
    </>
  );
}
export default WormSprite;
