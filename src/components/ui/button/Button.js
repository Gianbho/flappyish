//css
import "./button.css";
//librerie
import PropTypes from "prop-types";

function Button(props) {
  function click(e) {
    if (!!props.callbackClick) {
      props.callbackClick(e);
    }
  }

  return (
    <div className={`${props.classCss} btDefoalt`} onClick={click}>
      <section>{props.label}</section>
    </div>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  callbackClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  label: "Press",
};
export default Button;
