//css
import "./cardInput.css";
//librerie
import PropTypes from "prop-types";
//components function
import Button from "../button/Button";
import InputBox from "../inputBox/InputBox";
import { useState } from "react";
//img
import imgTutorial from "../../../assets/tutorial.PNG";

let valueInput = null;
function CardInput(props) {
  function change(e) {
    valueInput = e;
  }

  function send() {
    if (!!props.callbackSend && valueInput !== null) {
      props.callbackSend(valueInput, false);
    }
  }

  function sendTutorial() {
    if (!!props.callbackSend && valueInput !== null) {
      props.callbackSend(valueInput, true);
    }
  }

  return (
    <div className="CardInput" style={props.style}>
      <div className="layer"></div>
      <h1>Swordless</h1>
      <InputBox
        type={props.type}
        callbackChange={change}
        text={props.text}
        min={props.min}
        max={props.max}
      />
      <Button label={"Start"} callbackClick={send} />
      <Button label={"Start with Tutorial"} callbackClick={sendTutorial} />
    </div>
  );
}

CardInput.propTypes = {
  text: PropTypes.string,
  callbackSend: PropTypes.func.isRequired,
};

CardInput.defaultProps = {
  type: "text",
};
export default CardInput;
