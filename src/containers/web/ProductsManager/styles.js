// Theme
import { colors, text, queries } from '../../../theme';
export default {
  littleLogo : {
    height : 60,
    width  : 105,
    position: 'absolute',
    bottom: -15,
  },
  productsContainer : {
    backgroundColor : colors.shadow,
   
  },
  headerTitle : {
    ...text.principalTitle,
    lineHeight : 0.5,
    [queries.mobile] : {
      fontSize : 60,
    },
  },  
};
