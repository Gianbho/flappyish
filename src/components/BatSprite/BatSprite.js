import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

//componets class
import Sprite from "../Sprite";
//image
import batRun from "../../assets/bat/Blue_Flying.png";

const tileWormRun = { width: 32, height: 29 };

function BatSprite() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1200px)" });
  return (
    <>
      <Sprite
        src={batRun}
        states={6}
        tile={tileWormRun}
        scale={isBigScreen ? 5 : 3}
        framesPerStep={10}
        stopAnim={false}
        sprite={0}
      ></Sprite>
    </>
  );
}
export default BatSprite;
