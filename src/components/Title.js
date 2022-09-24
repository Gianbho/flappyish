import PropTypes from "prop-types";

function Title(props) {
  let left = props.tile.width * props.state;
  let bottom = props.tile.height * props.sprite;
  return (
    <div
      style={{
        width: props.tile.width,
        height: props.tile.height,
        scale: props.scale,
        overflow: "hidden",
        transform: `scale(${props.scale}, ${props.scale})`,
        transformOrigin: "bottom",
        left: props.left,
      }}
    >
      <img
        src={props.src}
        alt={""}
        style={{
          transform: `translate(-${left}px, -${bottom}px)`,
        }}
      ></img>
    </div>
  );
}
Title.propTypes = {
  src: PropTypes.string.isRequired,
  tile: PropTypes.object.isRequired,
  state: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
};

export default Title;
