const generateOlStyles = () => {
  const output = {};

  for (let i = 0; i < 10; i++) {
    let counterReset = '';
    for (let j = i + 1; j < 10; j++) {
      counterReset += `list-${j} `;
    }

    let listStyleType = 'decimal';
    if ((i + 1) % 2 === 0) listStyleType = 'lower-alpha';
    if ((i + 1) % 3 === 0) listStyleType = 'lower-roman';

    let marginTop = 0;
    if (i === 0) marginTop = 12;
    if (i === 1) marginTop = 4;

    output[i === 0 ? '& ol li' : `& ol li.ql-indent-${i}`] = {
      counterIncrement: `list-${i}`,
      counterReset,

      listStyleType: 'none',
      paddingLeft: `${1.5 + 2 * i}em`,

      '&::before': {
        content: `counter(list-${i}, ${listStyleType}) '. '`,
        marginLeft: '-1.5em',
        marginRight: '0.4em',

        fontWeight: 500,
        textAlign: 'right',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        width: '1.1em',
      },

      marginTop,
    };
  }

  return output;
};

export const renderedHtml = theme => ({
  renderedHtml: {
    ...theme.typography.body1,

    '& p': { margin: 0 },
    '& a': { color: `${theme.palette.primary.main} !important` },

    '& ol, & ul': { padding: 0, margin: 0 },

    ...generateOlStyles(),
  },
  renderedHtmlOriginal: {
    ...theme.typography.body2,
    '& p': { margin: 0 },
  },
});

export const padding = (theme, topMargin) => ({
  padding: theme.spacing.unit * 3,
  [theme.breakpoints.down('sm')]: { padding: theme.spacing.unit * 2 },

  marginTop: topMargin ? theme.spacing.unit * 2 : 0,
});

export const paperView = theme => ({
  root: {
    padding: theme.spacing.unit,
    maxWidth: 720,
    margin: '0 auto',

    '& h6': { marginBottom: theme.spacing.unit / 2 },
  },
  backButton: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  paper: { ...padding(theme) },

  title: { fontWeight: 500 },

  coverImage: {
    borderRadius: theme.shape.borderRadius / 2,
    maxWidth: '100%',
    height: '100%',
    minHeight: theme.spacing.unit * 15,

    marginBottom: theme.spacing.unit * 3,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient(-15deg, #fa0, ${
      theme.palette.primary.main
    })`,
  },

  section: {
    marginTop: theme.spacing.unit * 3,
  },

  ...renderedHtml(theme),
});
