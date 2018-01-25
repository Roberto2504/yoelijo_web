// @flow

// Types
type Palette = {
  black40          : 'rgba(0, 0, 0, 0.4)',
  white            : '#ffffff',
  white80          : 'rgba(255, 255, 255, 0.8)',
  purpleBrown      : '#231f20',
  dandelion        : '#fee800',
  black            : '#000000',
  blackTwo         : '#211e1e',
  purpleBrownTwo   : '#211d1e',
  black20          : 'rgba(0, 0, 0, 0.2)',
  tomato           : '#e42727',
  black30          : 'rgba(0, 0, 0, 0.3)',
  turtleGreen      : '#6ebf4a',
  turtleGreenTwo   : '#6bb047',
  lightTurtleGreen : '#a5da60',
  orangeyYellow    : '#fdb813',
  bluish           : '#1c75bc',
  lightGrey        : '#fefefe',
  lightGreyTwo     : '#706c6f',
  lineLightGray    : '#dbdbdb',
};

type Queries = {
  mobile        : string,
  ipadLandscape : string,
  ipadPortrait  : string,
};

const palette: Palette = {
  black40          : 'rgba(0, 0, 0, 0.4)',
  white            : '#ffffff',
  white80          : 'rgba(255, 255, 255, 0.8)',
  purpleBrown      : '#231f20',
  dandelion        : '#fee800',
  black            : '#000000',
  dark             : '#000000',
  ultraLight       : '#FFFFFF',
  blackTwo         : '#211e1e',
  purpleBrownTwo   : '#211d1e',
  black20          : 'rgba(0, 0, 0, 0.2)',
  tomato           : '#e42727',
  black30          : 'rgba(0, 0, 0, 0.3)',
  turtleGreen      : '#6ebf4a',
  turtleGreenTwo   : '#6bb047',
  lightTurtleGreen : '#a5da60',
  orangeyYellow    : '#fdb813',
  bluish           : '#1c75bc',
  lightGrey        : '#fefefe',
  grey             : '#dbdbdb',
  lightGreyTwo     : '#706c6f',
  lineLightGray    : '#dbdbdb',
};

export const queries: Queries = {
  mobile        : '@media (min-width : 320px) and (max-width : 768px)',
  ipadLandscape : '@media (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape)',
  ipadPortrait  : '@media (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)',
};

export const text = {
  principalTitle : {
    color      : palette.dark,
    fontFamily : 'Omnes-light',
    fontSize   : 70,
    lineHeight : 1.14,
    textAlign  : 'center',
    fontWeight : 'normal',
  },
  cyoTitleText : {
    fontFamily : 'Omnes-light',
    fontSize   : 60,
    fontWeight : 300,
    textAlign  : 'center',
    color      : palette.lightGreyTwo,
  },
  categoryMenuItemText : {
    marginTop        : 12,
    color            : palette.white,
    fontFamily       : 'Omnes-regular',
    fontSize         : 40,
    fontWeight       : 500,
    textAlign        : 'center',
    [queries.mobile] : {
      fontSize : 20,
    },
  },
  ctaText : {
    margin           : 0,
    marginBottom     : 5,
    fontFamily       : 'Omnes-medium',
    fontSize         : 14,
    textAlign        : 'left',
    color            : palette.dandelion,
    [queries.mobile] : {
      fontSize : 12,
    },
  },
  linkUppercase : {
    margin        : 0,
    color         : palette.white,
    fontFamily    : 'Omnes-medium',
    fontSize      : 18,
    fontWeight    : 500,
    letterSpacing : 0.1,
    textAlign     : 'left',
  },
  lightText : {
    margin        : 0,
    color         : palette.white,
    fontFamily    : 'Omnes-light',
    fontSize      : 30,
    fontWeight    : 200,
    letterSpacing : 0.1,
    textAlign     : 'center',
  },
  categoryHeaderTitleText : {
    color      : palette.white,
    fontFamily : 'Omnes-regular',
    fontSize   : 35,
    lineHeight : 1.14,
    textAlign  : 'center',
    fontWeight : 'normal',
  },
  categoryHeaderTitle : {
    color      : palette.white,
    fontFamily : 'Omnes-light',
    fontSize   : 130,
    lineHeight : 1.14,
    textAlign  : 'center',
    fontWeight : 'normal',
  },
  cyoHeaderTitle : {
    color      : palette.dark,
    fontFamily : 'Omnes-light',
    fontSize   : 60,
    lineHeight : 1.14,
    textAlign  : 'center',
    fontWeight : 'normal',
  },
  cyoHeaderPrice : {
    color      : palette.white,
    fontFamily : 'Omnes-light',
    fontSize   : 20,
    lineHeight : 1.14,
    textAlign  : 'center',
    fontWeight : 'normal',
  },
  ingredientLabelText : {
    fontFamily : 'Omnes-light',
    fontSize   : 15,
    fontWeight : 300,
    textAlign  : 'center',
    color      : palette.lightGreyTwo,
  },
  loginSecondaryTitle : {
    fontFamily : 'Omnes-regular',
    fontSize   : 25,
    fontWeight : 500,
    textAlign  : 'center',
    color      : palette.white,
  },
  loginForgotPass : {
    fontFamily : 'Omnes-regular',
    fontSize   : 13,
    fontWeight : 500,
    textAlign  : 'center',
    color      : palette.white,
  },
};

export const colors = palette;
