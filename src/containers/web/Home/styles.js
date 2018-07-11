// Theme
import { colors, text } from '../../../theme';
export default {
  litleLogo : {
    height   : 60,
    width    : 105,
    position : 'absolute',
    bottom   : -15,
  },
  description : {
    backgroundColor : colors.dandelion,
    position        : 'relative',
  },
  titlePrimary : {
    ...text.titlePrimary,
    margin : '115px 0px 0px',
  },
  mediumLogo : {
    height : 160,
    margin : '20px 0px 0px',
  },
  socialIcon : {
    fontSize : 90,
    margin   : 25,
    cursor   : 'pointer',
  },
};
