import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import JobSearch from './JobSearch';
import TopBar from './TopBar';
import UserHomepage from './UserHomepage';
import JobsAppliedForm from './JobsAppliedForm';
import Rewards from './Rewards';
import { FaTimes } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import ComingSoon from './ComingSoon';
import TableHistory from './TableHistory';
import Home from './mobile/Home';
import AccountPage from './AccountPage';
import getUrl from '../tools/getUrl';
import isMobile from '../tools/isMobile';
import NoMatch from './NoMatch';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'green'
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  noEmailIcon: {
    fontSize: '1rem'
  },
  emailMessage: {
    display: 'flex',
    alignItems: 'center'
  },
  mobileSnackBar: {
    position: 'fixed',
    bottom: '80px'
  }
}));

const User = ({ match }) => {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    id: '',
    username: '',
    currency: '',
    jobsApplied: [],
    jobsInterested: [],
    title: 'Software Engineer',
    rewards: [],
    profilePicture: '',
    bio: '',
    email: ''
  });
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(0);
  const [message, setMessage] = useState('');

  const handleClick = (value, message) => {
    if (message === undefined || message === null) {
      message = '';
    }
    setOpen(true);
    setToken(value);
    setMessage(message);
  };

  const handleLogout = () => {
    const url = getUrl('/user/logout');
    fetch(url, {
      method: 'GET'
    }).then(data => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    });
  };

  useEffect(() => {
    const url = getUrl('/api/user');
    /**
    const data = await fetch(url, {
      method: 'GET'
    });

    setUserData({
      id: data.id,
      username: data.user_name,
      currency: data.currency,
      jobsApplied: data.jobsApplied,
      jobsInterested: data.jobsInterested,
      rewards: data.rewards,
      email: data.email,
      ...userData
    });
    */
    setUserData({
      id: '1',
      username: 'bdbaraban',
      currency: 'money',
      email: '375@holbertonschool.com'
    });
  }, []);

  const isMobileDevice = isMobile();

  return (
    <Router>
      <TopBar isLoggedIn={true} handleLogout={handleLogout} color={true} />
      <div className={classes.mobileSnackbar}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          TransitionComponent={Slide}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={
            <span id="client-snackbar" className={classes.message}>
              <CheckCircleIcon
                className={(classes.icon, classes.iconVariant)}
              />
              You Earned {token} Coins! {message}
            </span>
          }
        />
        <Snackbar
          open={false}
          TransitionComponent={Slide}
          autoHideDuration={10000}
          ContentProps={{
            'aria-describedby': 'no-email'
          }}
          message={
            <span id="client-snackbar" className={classes.emailMessage}>
              <FaEnvelope className={(classes.icon, classes.iconVariant)} />
              Sign up for weekly emails?
            </span>
          }
          action={[
            <IconButton
              key="yes"
              aria-label="yes"
              color="inherit"
              className={classes.noEmailIcon}
            >
              <FaCheck />
            </IconButton>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.noEmailIcon}
            >
              <FaTimes />
            </IconButton>
          ]}
        />
      </div>
      <React.Fragment>
        {!isMobileDevice && (
          <Switch>
            <Route
              exact
              path={`${match.path}/`}
              render={props => <UserHomepage {...props} userData={userData} />}
            />
            <Route
              exact
              path={`${match.path}/jobs`}
              render={props => (
                <JobSearch {...props} handleToken={handleClick} />
              )}
            />
            <Route
              exact
              path={`${match.path}/appliedform`}
              render={props => (
                <JobsAppliedForm {...props} handleToken={handleClick} />
              )}
            />
            <Route
              exact
              path={`${match.path}/jobs/history`}
              render={props => (
                <TableHistory {...props} handleToken={handleClick} />
              )}
            />
            <Route
              exact
              path={`${match.path}/jobs/history`}
              component={Rewards}
            />
            <Route exact path="/jobs/saved" component={ComingSoon} />
            <Route
              exact
              path="/user/account"
              render={props => <AccountPage {...props} userData={userData} />}
            />
            <Route component={NoMatch} />
          </Switch>
        )}
        {isMobileDevice && (
          <Switch>
            <Route exact path="/user" render={props => <Home {...props} />} />
            <Route
              exact
              path="/user/account"
              render={props => <AccountPage {...props} userData={userData} />}
            />
          </Switch>
        )}
      </React.Fragment>
    </Router>
  );
};

export default User;
