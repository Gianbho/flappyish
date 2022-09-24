//css
import "./inputBox.css";
//librerie
import PropTypes from "prop-types";

function InputBox(props) {
  function change(e) {
    if (!!props.callbackChange) {
      props.callbackChange(e);
    }
  }

  return (
    <div className="inputBox">
      <label htmlFor={props.id}>{props.text}:</label>
      <input
        type={props.type}
        id={props.id}
        min={props.min}
        max={props.max}
        onChange={change}
      ></input>
    </div>
  );
}

InputBox.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  callbackChange: PropTypes.func.isRequired,
  text: PropTypes.string,
};

InputBox.defaultProps = {
  type: "text",
};
export default InputBox;
