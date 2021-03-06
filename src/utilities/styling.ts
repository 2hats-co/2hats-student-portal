export const setBackground = (
  backgroundColor?: string,
  backgroundImage?: string
) => {
  if (!backgroundImage) {
    document.body.style.backgroundColor = backgroundColor || '';
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
  } else if (
    document.body.style.backgroundImage !== `url(${backgroundImage})`
  ) {
    document.body.style.backgroundColor = backgroundColor || '';
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundAttachment = 'fixed';
  }
};

export const getLetterSpacing = (spacing: number, size: number) =>
  `${spacing / (size * 16)}rem`;
