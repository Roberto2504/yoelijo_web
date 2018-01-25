// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import Carousel from 'nuka-carousel';

// In-house module
import SliderItem from '../SliderItem';

// Styles
import Styles from './styles';
import radium from 'radium';

@radium
class Slider extends Component {
  static propTypes = {
    campanies : React.PropTypes.array,
    autoplay  : React.PropTypes.bool,
  }

  constructor (props) {
    super(props);
    this.state = {
      campanies : [
        {
          titleName : 'Esto es solo una prueb',
          id        : 1,
        },
        {
          titleName : 'Bop',
          id        : 2,
        },
        {
          titleName : 'Esto es solo una prueb',
          id        : 3,
        },
        {
          titleName : 'Bop',
          id        : 4,
        },
      ],
    };
  }

  render () {
    return (
      <Carousel style={Styles.carousel} autoplay={this.props.autoplay}>
        {
          _.map(this.state.campanies, (title) => {
            return (
              <SliderItem title={title.titleName} key={title.id} />
            );
          })
        }
      </Carousel>
    );
  }
}

export default Slider;
