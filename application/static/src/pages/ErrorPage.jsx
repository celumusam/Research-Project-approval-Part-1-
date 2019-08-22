import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Emoji from '../components/Emoji';
import getUrl from '../tools/getUrl';

/**
 * ErrorPage styles
 */
const useStyles = makeStyles(theme => ({
  body: {
    background: theme.palette.background.mainGradient,
    height: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }
}));

/**
 * 404 page
 */
const ErrorPage = () => {
  const classes = useStyles();

  const url = getUrl();

  return (
    <div className={classes.body}>
      <Typography
        gutterBottom
        variant="h5"
        component="h1"
        className={classes.text}
      >
        Er, are you sure this is a page?
        <Emoji label="confused-face" symbol="😕" />
      </Typography>
      <Link href={`${url}/user`}>
        <Typography variant="h5" className={classes.text}>
          Return Home
        </Typography>
      </Link>
    </div>
  );
};

export default ErrorPage;
