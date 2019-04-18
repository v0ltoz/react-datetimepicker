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
