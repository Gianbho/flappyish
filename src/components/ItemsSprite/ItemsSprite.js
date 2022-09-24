import React from "react";
import { useMediaQuery } from "react-responsive";
//componets class
import Sprite from "../Sprite";
//image
import item from "../../assets/animated_items.png";

const tileWormRun = { width: 32, height: 32 };

function ItemsSprite(props) {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1200px)" });

  return (
    <>
      <Sprite
        src={item}
        states={8}
        tile={tileWormRun}
        scale={isBigScreen ? 4 : 2}
        framesPerStep={10}
        stopAnim={false}
        sprite={props.sprite}
      ></Sprite>
    </>
  );
}
export default ItemsSprite;
