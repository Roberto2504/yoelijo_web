// Third party Modules
import React, { Component } from 'react';
// CSS
require('./style.less');

class Slider extends Component {

  constructor (props) {
    super(props);
    this.state = {
      title   : '',
      content : '',

    };
  }

  componentWillMount () {
    this.openSlider();
  }

  render () {
    return (
      <div className="login-slider">
        <h3>{this.state.title}</h3>
        <h1>{this.state.content}</h1>
      </div>
    );
  }
  openSlider = () => {
    this.setState({
      title   : 'Chuck Palahniuk, Fight Club',
      content : 'You are not special. You\'re not a beautiful and unique snowflake. You\'re the same decaying organic matter as everything else. We\'re all part of the same compost heap. We\'re all singing, all dancing crap of the world.',
    });
  }

}

export default Slider;
