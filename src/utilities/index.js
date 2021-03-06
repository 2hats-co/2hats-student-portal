import { decomposeColor, recomposeColor } from '@material-ui/core/styles';

export const sleep = millis => {
  return new Promise(resolve => setTimeout(resolve, millis));
};

export const globalReplace = (string, tag, value) => {
  var re = new RegExp(tag, 'g');
  return string.replace(re, value);
};

export const copyToClipboard = text => {
  const dummy = document.createElement('input');
  document.body.appendChild(dummy);
  dummy.setAttribute('value', text);
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
};

export const propsIntoObject = props =>
  props.reduce((r, c) => Object.assign(r, c), {});

export const getInitials = displayName => {
  let initials = displayName.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  return initials;
};

export const removeHtmlTags = text => {
  if (!text) return '';
  const htmlTags = /(<([^>]+)>)/gi;
  return text.replace(htmlTags, '');
};

export const removeUrls = text =>
  text.replace(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
    ''
  );

export const removeEmptyParens = text => text.replace('()', '');
export const removeNbsp = text => text.replace(/&nbsp;/gm, '');

export const cleanTextForDisplay = text =>
  removeEmptyParens(removeNbsp(removeUrls(removeHtmlTags(text))));

export const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getRandomId = () =>
  Math.random()
    .toString(36)
    .substring(2);

export const idealTextColor = rgbColor => {
  const splitColor = rgbColor
    .replace('rgb(', '')
    .replace(')', '')
    .split(',');
  const components = { R: splitColor[0], G: splitColor[1], B: splitColor[2] };

  const nThreshold = 105;
  const bgDelta =
    components.R * 0.299 + components.G * 0.587 + components.B * 0.114;

  return 255 - bgDelta < nThreshold ? '#000000' : '#ffffff';
};

export const randomGreeting = () => {
  const greetings = [
    'Ni hao',
    'Yo',
    'Hey',
    'Howdy',
    '??Hola',
    'Sup',
    'What???s good',
    'Shalom',
    'Yee haw',
    'Top of the morning to ya',
    'Bone app the teeth',
    'Great to see ya',
    '??Feliz cumplea??os',
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
};

export const compareByGivenName = (a, b) => {
  if (a.givenName < b.givenName) return -1;
  if (a.givenName > b.givenName) return 1;
  return 0;
};

export const capitalise = str => str.charAt(0).toUpperCase() + str.slice(1);

export const sanitiseHtml = str =>
  str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

export const convertToEnDash = input => input.toString().replace('-', '???');

/**
 * Gets the intermediate color in a gradient, given a ratio
 * @param {string} color1 String in format: rgb, rgba, hsl, or hsla
 * @param {string} color2 String in format: rgb, rgba, hsl, or hsla
 * @param {number} [ratio=0.5] Optional
 * @returns {string} RGB formatted color string
 */
export const getIntermediateColor = (color1, color2, ratio) => {
  if (ratio <= 0) return color1;
  if (ratio >= 1) return color2;

  const decomposed1 = decomposeColor(color1);
  const decomposed2 = decomposeColor(color2);

  const intermediate = {
    type: 'rgb',
    values: decomposed1.values.map((x, i) =>
      Math.round(x * (1 - ratio) + decomposed2.values[i] * ratio)
    ),
  };

  return recomposeColor(intermediate);
};
