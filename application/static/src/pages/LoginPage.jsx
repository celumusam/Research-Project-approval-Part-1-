import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TopBar from '../components/TopBar';
import getUrl from '../tools/getUrl';

/**
 * LoginPage styles
 */
const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.mainGradient,
    height: '100vh',
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontWeight: '400',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    color: 'rgba(255, 255, 255, 1)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    padding: '10px 16px',
    marginTop: theme.spacing(1)
  }
}));

/**
 * Login page
 */
const LoginPage = () => {
  const classes = useStyles();

  // Log in to GitHub through back-end
  const handleOAuth = () => {
    fetch(getUrl('/login'), {
      method: 'GET',
      dataType: 'json'
    }).then(data => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    });
  };

  return (
    <>
      <TopBar isLoggedIn={false} color={false} />
      <div className={classes.root}>
        <Container className={classes.container}>
          <Typography variant="h6" component="h1" className={classes.title}>
            Calling all software engineers!
          </Typography>
          <Typography variant="h4" component="h3" className={classes.title}>
            Gamify your job search here!
          </Typography>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={handleOAuth}
          >
            Login with Github
          </Button>
        </Container>
      </div>
    </>
  );
};

export default LoginPage;
