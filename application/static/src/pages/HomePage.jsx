import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';
import StandingCard from '../components/StandingCard';
import TipCard from '../components/TipCard';

/**
 * HomePage styles
 */
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}));

/**
 * User home page
 */
const HomePage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <ProfileCard />
        </Grid>
        <Grid item xs={12} sm={9}>
          <StandingCard />
        </Grid>
        <Grid item xs={12} sm={7}>
          <Paper className={classes.paper}>TODO: Career Sprint Schedule?</Paper>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TipCard />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
