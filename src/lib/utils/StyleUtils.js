export const addFocusStyle = (focused, currentStyle) => {
  let style = JSON.parse(JSON.stringify(currentStyle));
  if (focused) {
    style.outline = 'cornflowerblue';
    style.outlineStyle = 'auto';
  } else {
    style.outlineStyle = '';
  }
  return style;
};

const white = '#FFFFFF';
const black = '#161617';
export const lightTheme = {
  background: white,
  color: black,
};

export const darkTheme = {
  background: black,
  color: white,
};

export const applyCancelStyling = {
  gridColumnStart: 3,
  gridColumnEnd: 3,
  gridRowStart: 2,
  gridRowEnd: 2,
  justifySelf: 'end',
  marginRight: '13px',
  display: 'flex',
  justifyContent: 'flex-end',
};
