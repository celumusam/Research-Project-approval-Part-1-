import React, { forwardRef, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

/**
 * NavbarDrawer component styles
 */
const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  options: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  optionBox: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  optionText: {
    color: theme.palette.common.black,
    [theme.breakpoints.up('sm')]: {
      color: theme.palette.common.white
    }
  },
  toolbar: theme.mixins.toolbar,
  title: {
    color: theme.palette.common.white
  },
  fab: {
    margin: theme.spacing(1)
  }
}));

/**
 * Navbar menu drawer.
 */
const NavbarDrawer = () => {
  const classes = useStyles();

  // Link to home page
  const HomeLink = forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/user" {...props} />
  ));

  // Link to 'Add Job' page
  const AddLink = forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/user/add" {...props} />
  ));

  // Link to 'Applied Jobs' page
  const AppliedLink = forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/user/applied" {...props} />
  ));

  // Link to 'Saved Jobs' page
  const SavedLink = forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/user/saved" {...props} />
  ));

  // Link to 'Search Jobs' page
  const SearchLink = forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/user/search" {...props} />
  ));

  // Link to profile edit page
  const ProfileLink = forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/user/profile" {...props} />
  ));

  return (
    <div>
      <Hidden xsDown implementation="js">
        <Container className={classes.container}>
          <Link component={HomeLink}>
            <Typography variant="h6" align="center" className={classes.title}>
              Job Odyssey
            </Typography>
          </Link>
        </Container>
      </Hidden>
      <Hidden smUp>
        <div className={classes.toolbar} />
      </Hidden>
      <Divider />
      <Container className={classes.options}>
        <Box className={classes.optionBox} component="span">
          <Link component={AddLink}>
            <Fab color="inherit" aria-label="add" className={classes.fab}>
              <AddIcon />
            </Fab>
          </Link>
          <Typography className={classes.optionText} align="center">
            Add
          </Typography>
        </Box>
        <Box className={classes.optionBox} component="span">
          <Link component={AppliedLink}>
            <Fab color="inherit" aria-label="add" className={classes.fab}>
              <FormatAlignLeftIcon />
            </Fab>
          </Link>
          <Typography className={classes.optionText} align="center">
            Applied
          </Typography>
        </Box>
        <Box className={classes.optionBox} component="span">
          <Link component={SavedLink}>
            <Fab color="inherit" aria-label="add" className={classes.fab}>
              <MoveToInboxIcon />
            </Fab>
          </Link>
          <Typography className={classes.optionText} align="center">
            Saved
          </Typography>
        </Box>
        <Box className={classes.optionBox} component="span">
          <Link component={SearchLink}>
            <Fab color="inherit" aria-label="add" className={classes.fab}>
              <SearchIcon />
            </Fab>
          </Link>
          <Typography className={classes.optionText} align="center">
            Search
          </Typography>
        </Box>
      </Container>
      <Divider />
      <Container className={classes.options}>
        <Box className={classes.optionBox} component="span">
          <Link component={ProfileLink}>
            <Fab color="inherit" aria-label="add" className={classes.fab}>
              <PersonIcon />
            </Fab>
          </Link>
          <Typography className={classes.optionText} align="center">
            My Profile
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default memo(NavbarDrawer);
