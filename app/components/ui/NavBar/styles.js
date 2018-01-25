// Theme
import { colors, text, queries } from '../../../theme';
export default {
  navBar : {
    backgroundColor : colors.dark,
    boxShadow       : '0px 1px 5px #888',
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    zIndex          : 1000,
  },
  littleLogo : {
    height : 60,
    width  : 105,
    position: 'absolute',
    bottom: -15,
    cursor: 'pointer',
  },
  accountIcon : {
    width: 50,
    height: 50,
    color: colors.ultraLight,
  },
  accountButton : {
    width: 55,
    height: 55,
    padding: 0,
  },
};
