import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getCookie } from '../tools/userTools.js';
import getUrl from '../tools/getUrl';

const useStyles = makeStyles(theme => ({
  fullwidth: {
    width: '100%',
  },
  flexRow: {
    display: 'flex',
  },
  flexColumn: {
    display: 'flex',
  },
}));

const styles = theme => ({


});

class JobListBody extends Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    const { classes } = this.props;
    const { type, jobs } = this.props;
    return (
      <div>
        <Buttons />
        <ColumnNames />
        <JobList jobs={jobs}/>
      </div>
    );
  }
}

function Buttons(props) {
  const { classes } = useStyles();
    
  return (
    <div>
    </div>
  )

}

function ColumnNames(props) {
  const { classes } = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        Company
      </Grid>
      <Grid item xs={2}>
        Date
      </Grid>
      <Grid item xs={6}>
        Notes
      </Grid>
    </Grid>
  )
}

function JobList(props) {
  const { classes } = useStyles();
  const { jobs } = props;
  const listItems = jobs.map((job) => (
    <ListItem key={job.id}>
      <ListItemText id={job.company} primary={job.company} />
      <ListItemText id={job.date_applied} primary={job.date_applied} />
      <ListItemText id={job.notes} primary={job.notes} />
    </ListItem>
  ));

  return (
    <List>
      {listItems }
    </List>
  );
}

export default withStyles(styles)(JobListBody);
