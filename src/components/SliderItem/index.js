// @flow
import React, { Component } from 'react';

// Styles
import Styles from './styles';
import radium from 'radium';

@radium
class SliderItem extends Component {
  static propTypes = {
    title : React.PropTypes.string,
  }

  render () {
    return (
      <div className="row middle-xs height-default" style={Styles.sliderItem}>
        <div className="col-xs-12">
          <h1 style={Styles.headerTitle}>{this.props.title}</h1>
        </div>
      </div>
    );
  }
}

export default SliderItem;
