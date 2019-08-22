import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'transparent',
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    },
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    fontWeight: 400
  },
  link: {
    color: 'white',
    fontWeight: 400,
    textDecoration: 'none'
  },
  button: {
    color: 'white'
  }
}));

const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" edge="start" className={classes.title}>
          Job Odyssey
        </Typography>
        <Link
          href="https://github.com/christopherchoe/jobodyssey_hbtn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="h6" className={classes.link}>
            Learn More
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
