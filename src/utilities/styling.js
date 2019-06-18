export function setBackground(backgroundColor, backgroundImage, isMobile) {
  if (isMobile) {
    document.body.style.backgroundSize = 'fit';
  } else {
    document.body.style.backgroundSize = 'cover';
  }

  if (!backgroundImage) {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
  } else if (
    document.body.style.backgroundImage !== `url(${backgroundImage})`
  ) {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundAttachment = 'fixed';
  }
}

export const getLetterSpacing = (spacing, size) =>
  `${spacing / (size * 16)}rem`;
