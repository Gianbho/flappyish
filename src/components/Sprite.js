import { Component } from "react";
import Title from "./Title";
import PropTypes from "prop-types";

class Sprite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stateimg: 0,
    };

    this.tick = 0;
    this.stateframe = 0;
    this.frame = 0;
  }

  componentDidMount() {
    this.animate();
  }
  componentDidUpdate(preProps, currProps) {
    if (preProps.src !== this.props.src) {
      console.log("change");
      this.setState({
        stateimg: 0,
      });
      cancelAnimationFrame(this.frame);
      this.animate();
    }
  }

  animate = () => {
    if (this.tick === this.props.framesPerStep) {
      this.tick = 0;
      this.stateframe = (this.state.stateimg + 1) % this.props.states;
      this.setState({
        stateimg: this.stateframe,
      });
    }
    this.tick += 1;

    if (!this.props.stopAnim || this.stateframe < this.props.states - 1) {
      this.frame = requestAnimationFrame(this.animate);
    } else {
      this.tick = 0;
      this.stateframe = 0;
    }
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
  }

  render() {
    return (
      <Title
        src={this.props.src}
        tile={this.props.tile}
        scale={this.props.scale}
        state={this.state.stateimg}
        sprite={this.props.sprite}
        left={this.props.left}
      />
    );
  }
}

Sprite.propTypes = {
  framesPerStep: PropTypes.number.isRequired,
  states: PropTypes.number.isRequired,
};

export default Sprite;
