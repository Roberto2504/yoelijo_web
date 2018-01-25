// Theme
import { colors, text, queries } from '../../../theme';
export default {
  sliderItem : {
    width      : '100%',
    background : colors.bluish,
  },
  headerTitle : {
    ...text.titleBig,
    lineHeight       : 0.5,
    [queries.mobile] : {
      fontSize : 60,
    },
  },
};
