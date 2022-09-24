//css
import "./start.css";
import { useLocation, useNavigate } from "react-router-dom";

import { Howl, Howler } from "howler";
//sound
import music from "../../assets/sound/musicBackground.mp3";
//components ui
import CardInput from "../../components/ui/cardInput/CardInput";
//sprite
import WormSprite from "../../components/WormSprite/WormSprite";
//img
import AttackWorm from "../../assets/worm/Attack.png";
import AttackComboGif from "../../assets/player/__AttackComboNoMovement.gif";
import { useEffect } from "react";

import eventsBus from "../../events/eventsBus-1";

const soundBackground = new Howl({
  src: [music],
  loop: true,
  volume: 0.05,
});

function Start() {
  const location = useLocation();

  useEffect(() => {
    eventsBus.on("restart", () => {
      window.location.reload(false);
    });

    return () => {
      eventsBus.remove("restart", () => {});
    };
  }, []);
  soundBackground.once("load", function () {
    //soundBackground.play();
  });

  const navigate = useNavigate();
  function handleSend(e, g) {
    navigate("/game", { state: { value: e.target.value, showTutorial: g } });
    // console.log("evento", e);
    // console.log("valore", e.target.value);
  }

  return (
    <div className="startScreen">
      <CardInput text={"Name"} callbackSend={handleSend} />
      <section className="wormStart">
        <WormSprite states={16} src={AttackWorm} scale={10} />
      </section>
      <img className="knight" src={AttackComboGif} alt={""}></img>
    </div>
  );
}
export default Start;
