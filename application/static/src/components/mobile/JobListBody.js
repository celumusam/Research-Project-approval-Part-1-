import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getCookie } from '../tools/userTools.js';
import getUrl from '../tools/getUrl';

const company = 4;
const date = 4;
const notes = 4;

const useStyles = makeStyles(theme => ({
  fullWidth: {
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    alignContent: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  bold: {
    fontWeight: '500',
    fontSize: '14px',
  },
  text: {
    fontSize: '14px',
  },
}));

const styles = theme => ({


});

export function JobListBody(props) { 
  const classes = useStyles();
  const { type, jobs } = props;
  
  return (
    <div className={classes.fullWidth}>
      <Buttons />
      <JobList jobs={jobs}/>
    </div>
  );
}

function Buttons(props) {
  const classes = useStyles();
    
  return (
    <div>
    </div>
  )

}

function ListColumnName(props) {
  const classes = useStyles();
  return (
    <ListItemText
      id={props.id}
      primary={props.primary}
      classes={{
        primary: classes.bold
      }}
    />
  )
}

function ListItemRow(props) {
  const classes = useStyles();
  return (
    <ListItemText
      id={props.id}
      primary={props.primary}
      classes={{
        primary: classes.text
      }}
    />
  )
}
function JobList(props) {
  const classes = useStyles();
  const { jobs } = props;
  const listItems = jobs.map((job) => (
    <Grid item xs={12}>
      <ListItem key={job.id}>
        <Grid item xs={4}>
          <ListItemRow id={job.company} primary={job.company} />
        </Grid>
        <Grid item xs={4}>
          <ListItemRow id={job.date_applied} primary={job.date_applied.slice(5, 16)} />
        </Grid>
        <Grid item xs={4}>
          <ListItemRow id={job.notes} primary={job.notes} />
        </Grid>
      </ListItem>
      <Divider />
    </Grid>
  ));

  return (
    <Grid container spacing={1} className={classes.fullWidth, classes.flexColumn}>
      <List className={classes.fullWidth}>
        <Grid item xs={12}>
          <ListItem key="title">
            <Grid item xs={4}>
              <ListColumnName id="company" primary="Company" />
            </Grid>
            <Grid item xs={4}>
              <ListColumnName id="date" primary="Date" />
            </Grid>
            <Grid item xs={4}>
              <ListColumnName id="Notes" primary="Notes" />
            </Grid>
          </ListItem>
          <Divider />
        </Grid>
        {listItems}
      </List>
    </Grid>
  );
}

export default withStyles(styles)(JobListBody);
