import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppliedForm from '../components/AppliedForm';
import Emoji from '../components/Emoji';
import Layout from '../components/Layout';

/**
 * AddPage styles
 */
const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  }
}));

/**
 * Add applied jobs page
 */
const AddPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Typography variant="h6" className={classes.title}>
        Applied to a job? Nice! Record it here - all fingers crossed!{' '}
        <Emoji label="crossed-fingers" symbol="🤞" />
      </Typography>
      <AppliedForm />
    </Layout>
  );
};

export default AddPage;
