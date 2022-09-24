//css
import "./gameResult.css";
import WormSprite from "../../components/WormSprite/WormSprite";
//componenti funzionali
import Button from "../../components/ui/button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import IdleWorm from "../../assets/worm/Idle.png";

import eventsBus from "../../events/eventsBus-1";
import { useState } from "react";

let matchesHistory = [];

function GameResults(props) {
  const [showRanking, setShowRanking] = useState(false);

  if (!!localStorage.getItem("matches")) {
    matchesHistory = JSON.parse(localStorage.getItem("matches"));
  }

  const navigate = useNavigate();
  const location = useLocation();
  let newPlayer = true;

  const player = {
    name: location.state.name,
    score: location.state.score,
  };

  for (let match of matchesHistory) {
    if (match.name.toLowerCase() === player.name.toLowerCase()) {
      if (match.score < player.score) {
        match.score = player.score;
      }
      newPlayer = false;
    }
  }

  if (newPlayer) {
    matchesHistory.push(player);
  }
  matchesHistory.sort(function (a, b) {
    return b.score - a.score;
  });
  localStorage.setItem("matches", JSON.stringify(matchesHistory));

  function restart() {
    navigate("/", { state: true });
    eventsBus.dispatch("restart");
  }

  return (
    <div className="resultsPage">
      <div className="resultsBox">
        <div className="layer"></div>
        <p className="point">{`${location.state.name} || ${location.state.score} punti`}</p>

        <div className="history">
          {matchesHistory.map((match, key) => {
            return key === 0 ? (
              <p className="best" key={key}>
                <span>{match.name}</span> <span>{`${match.score}pt`}</span>
              </p>
            ) : (
              <p key={key}>
                <span>{match.name}</span> <span>{`${match.score}pt`}</span>
              </p>
            );
          })}
        </div>
        <Button
          label={"Nuova partita"}
          callbackClick={restart}
          classCss="buttonResult"
        />
      </div>

      <section className="wormResults">
        <WormSprite framesPerStep={15} src={IdleWorm} scale={5} />
      </section>
    </div>
  );
}
export default GameResults;
