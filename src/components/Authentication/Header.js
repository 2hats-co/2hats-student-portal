import React from 'react';
import Typography from '@material-ui/core/Typography';

function Header(props) {
  const { greeting, name } = props;

  return (
    <Typography
      variant="title"
      color="primary"
      style={{ width: '100%', textAlign: 'center', marginBottom: 10 }}
    >
      {greeting}
      {name ? ',' : null} {name}
    </Typography>
  );
}

export default Header;
