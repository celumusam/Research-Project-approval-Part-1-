import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';

/**
 * Layout component styles
 */
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 170
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 56
    }
  },
  children: {
    flexGrow: 1,
    paddingTop: theme.spacing(6),
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(4),
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(4)
    }
  }
}));

/**
 * Generic layout wrapper
 */
const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <main className={classes.root}>
        <div className={classes.children}>{children}</div>
      </main>
    </>
  );
};

export default Layout;
