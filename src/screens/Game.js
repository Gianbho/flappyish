import React, { Component } from "react";
import { Howl, Howler } from "howler";

import withRouter from "../withNavigation";
//events
import eventsBus from "../events/eventsBus-1";

//sound
import zubatSound from "../assets/sound/zubat.mp3";
import coinSound from "../assets/sound/soundCoin.mp3";
import potionSound from "../assets/sound/potion.mp3";

//components class
import LivesCard from "../components/LivesCard/LivesCard";
import Tutorial from "../components/Tutorial/Tutorial";
import MainChar from "../components/MainChar/MainChar";
import Spawner from "../components/Spawner/Spawner";
import WormSprite from "../components/WormSprite/WormSprite";

//css
import "../App.css";
import "./game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birdAnim: false,
      char: {
        positionY: 1,
        positionX: 2,
      },
      counterActive: true,
      score: this.scoreFinal,
      isTutorial: this.props.router.location?.state?.showTutorial,
    };
    this.position = null;
    this.rend = null;
    this.hitPipe = Math.random();
    this.myInterval = null;
    this.birdRef = null;
    this.notBirdRef = [];
    this.bgRef = null;

    this.score = null;
    this.location = this.props.router.location;
    this.scoreFinal = 0;
    this.multiplier = 20;
    this.soundZubat = new Howl({
      src: [zubatSound],
      volume: 0.05,
    });
    this.soundCoin = new Howl({
      src: [coinSound],
      volume: 0.2,
    });
    this.soundPotion = new Howl({
      src: [potionSound],
      volume: 0.2,
    });
  }
  /*   const birdRef = useRef(null);
  const notBirdRef = useRef(null);
  const thirdRef = useRef(null);
 */

  componentDidMount() {
    console.log(this.location.state)
    this.myInterval = setInterval(
      this.checkPos,
      100,
      this.notBirdRef
    );

    if(this.state.isTutorial || this.state.counterActive){
      eventsBus.on('endTutorial', () => {
        this.setState({isTutorial: false, counterActive: false});
        this.score = setInterval(this.scoreCount, 600);
        console.log(this.state)
      });    
    } else {
      this.score = setInterval(this.scoreCount, 600);
    }
  }

  scoreCount = () => {
    this.scoreFinal += this.multiplier;
    this.setState({
      score: this.scoreFinal,
    });
  };

  handleCollisions = (coll) => {
    this.hitPipe = coll?.id;

    let tempCharState = this.state.char;

    if (coll?.ref.id === "pipe") {
      eventsBus.dispatch("hitContact", true);
      this.handlePipeColl(tempCharState);
    } else if (coll?.ref?.id.includes("powerUp")) {
      this.handlePowerUpColl(tempCharState, coll.ref.id);
      coll.ref.style.display = 'none'
    }
    this.setState({
      char: tempCharState,
    });
  };

  handleDeath = () => {
    if (this.state.char.positionY === 0) {
      this.birdRef.style.zIndex = `${this.state.char.positionY}`;
    }
    eventsBus.dispatch("die");
    clearInterval(this.myInterval, this.score);

    setTimeout(() => {
      this.props.router.navigate("/gameResults", {
        state: { name: this.location.state.value, score: this.state.score },
      });
    }, 1200);
  };

  handlePipeColl = (state) => {
    this.soundZubat.play();
    state.positionX = this.state.char.positionX - 1;
    if (state.positionX <= 0) this.handleDeath();
  };

  handlePowerUpColl = (state, id) => {
    if (id[id.length - 1] === "0") {
      if (this.state.char.positionX >= 4) {
        return;
      }
      this.soundPotion.play();
      state.positionX = this.state.char.positionX + 1;
    } else {
      console.log("new powerUp");
      this.DoublePointsPowerUp();
    }
  };

  DoublePointsPowerUp = () => {
    this.soundCoin.play();
    this.multiplier = this.multiplier * 2;
    setTimeout(() => {
      this.multiplier = this.multiplier / 2;
    }, 20000);
  };

  getInfos = () => (ref, id) => {
    let i = 0;
    if (ref !== null) {
      //console.log(ref);
      ref.forEach(ref => {
        if (ref?.ref?.id?.toLowerCase() === "flappy") {
          if (!this.birdRef) this.birdRef = ref.ref;
          console.log(`lane${id}`, ref);
        } else {
          this.notBirdRef[i] = ref;
          i++;
        }
      });
    }
  };

  checkPos = (pipes) => {
    const a = this.birdRef?.getBoundingClientRect();

    for (let pipe of pipes) {
      if (!pipe) continue;

      let b = pipe?.ref?.getBoundingClientRect();
      if (
        pipe?.id !== this?.hitPipe &&
        a?.x + a?.width > b?.x &&
        a?.x < b?.x + b?.width &&
        a?.y + a?.height > b?.y &&
        a?.y < b?.y + b?.height
      ) {
        console.log("toccato", pipe);
        this.handleCollisions(pipe);
      }
    }
  };

  handleAnim = (e) => {
    //console.log(e.target);
    this.setState({
      birdAnim: !this.state.birdAnim,
      char: {
        ...this.state.char,
        positionY: parseInt(e.target.id),
      },
    });
  };

  render() {
    return (
      <>
        <div className="game">
          <div className="points">{this.state.score}</div>
          {this.state.isTutorial && <Tutorial />}
          {!this.state.isTutorial && this.state.counterActive && <Tutorial onlyCounter={this.state.counterActive}/>}
          <LivesCard lives={this.state.char.positionX} />
          <div className="bg bg-animation"></div>
          {!this.state.isTutorial && !this.state.counterActive && <Spawner callback={this.getInfos()} />}
          <div className="lanes">
            <MainChar
              callback={this.getInfos()}
              startAnim={this.state.birdAnim}
              position={{
                positionY: this.state.char.positionY,
                positionX: this.state.char.positionX,
              }}
            />
            <div className="worm">
              <WormSprite scale={10} />
            </div>

            <span
              id="0"
              onClick={this.handleAnim}
              className="movement-lane lane"
            ></span>
            <span
              id="1"
              onClick={this.handleAnim}
              className="movement-lane lane"
            ></span>
            <span
              id="2"
              onClick={this.handleAnim}
              className="movement-lane lane"
            ></span>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Game);
