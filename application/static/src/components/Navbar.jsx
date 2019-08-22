import React, { forwardRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NavbarDrawer from './NavbarDrawer';

// Width of menu drawer
const DRAWER_WIDTH = 170;

/**
 * Navbar component styles
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0
    }
  },
  appBar: {
    background: theme.palette.background.mainGradient,
    width: '100%'
  },
  drawerPaper: {
    background: theme.palette.common.white,
    borderRight: 'none',
    width: DRAWER_WIDTH,
    [theme.breakpoints.up('sm')]: {
      background: theme.palette.background.mainGradient
    }
  },
  title: {
    color: theme.palette.common.white
  }
}));

/**
 * Responsive navigation bar.
 * Permanently fixed to left on desktop.
 * Fixed to top with slide-in drawer on mobile.
 */
const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle drawer open/closed (mobile-only)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Link to home page
  const HomeLink = forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/user" {...props} />
  ));

  return (
    <div className={classes.root}>
      <Hidden smUp implementation="js">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Link component={HomeLink}>
              <Typography
                className={classes.title}
                variant="h6"
                component="h1"
                noWrap
              >
                Job Odyssey
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <NavbarDrawer />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            elevation={32}
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <NavbarDrawer />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default Navbar;
