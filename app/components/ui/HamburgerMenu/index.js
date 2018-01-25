// Third party Modules
import React, {Component} from 'react';
import {observer} from 'mobx-react';
import gsap from 'gsap';
import {browserHistory} from 'react-router';

require('./style.less');
import radium from 'radium';

// In-house modules
import AuthService from '../../../utils/AuthService';

@radium
@observer
class HamburgerMenu extends Component {
  static propTypes = {
    burgerMenuStore : React.PropTypes.object,
    openMenu        : React.PropTypes.bool,
    auth            : React.PropTypes.instanceOf(AuthService),
  };

  constructor (props) {
    super(props);
  }

  componentWillReceiveProps (nextProps) {
    const burger = document.getElementById('Burger');
    const menuEl = document.getElementById('menuEls');
    const hidePx = nextProps.openMenu ? '0' : '-100%';
    if (nextProps.openMenu) {
      gsap.to(burger, 0.5, {
        left       : hidePx,
        ease       : Sine.easeOut,
        onComplete : () => {
          menuEl.style.visibility = 'visible';
          gsap.staggerFrom('.stagger', 1.3, {
            force3D : true,
            opacity : 0,
            scale   : 0.4,
            ease    : Elastic.easeOut,
          }, 0.1);
        },
      });
    } else {
      gsap.staggerTo('.stagger', 0.5, {
        opacity : 0,
        ease    : Back.easeIn,
        y       : -150,
      }, 0.1, () => {
        menuEl.style.visibility = 'hidden';
        gsap.to(burger, 0.5, { left : hidePx, ease : Sine.easeOut});
        gsap.staggerTo('.stagger', 0.1, { opacity : 1, y : 0, ease : Back.easeIn }, 0.1);
      });
    }
  }

  render () {
    console.log(this.props.auth, 'this is auth in hamburger menu');
    return (
      <div id="Burger">
        <div className="log-out-container row">
          <div className="log-out-content col-xs-12 end">
          </div>
        </div>
        <ul id="menuEls">
          <li className="stagger" style={{display : 'none'}}><a>Settings</a></li> {/* display none because this feature append in next versions */}
        </ul>
        <div className="burger-footer">
          <span>© Tavuel506. 2018 </span>
        </div>
      </div>
    );
  }

  closeBurger = () => {
    this.props.burgerMenuStore.toggleBurger(false);
  }

  goToPage = (page) => {
    this.props.burgerMenuStore.toggleBurger(false);
    browserHistory.push(page);
  }

  openAccount = () => {
    this.props.burgerMenuStore.toggleBurger(false);
  }
}

export default HamburgerMenu;
