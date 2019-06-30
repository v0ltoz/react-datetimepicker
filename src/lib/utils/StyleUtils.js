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
