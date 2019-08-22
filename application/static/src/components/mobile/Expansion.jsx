import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FaPlusSquare } from 'react-icons/fa';
import Applied from './Applied';
import Interviewing from './Interviewing';
import OfferStage from './OfferStage';
import Archive from './Archive';
import AddJob from './AddJob';
import JobListBody from './JobListBody';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '1rem',
  },
  font: {
    fontWeight: 500,
    fontSize: '1rem',
  },
  summary: {
    backgroundColor: theme.palette.primary.secondary,
    color: 'white',
  },
  icon: {
    color: 'white',
  },
  expansionPadding: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
}));


export default function Expansion(props) {
  const classes = useStyles();
  const panels = [
    {
      key: 'Applied',
      component: <JobListBody type={'applied'} jobs={props.applied}/>
    },
    {
      key: 'Interviewing',
      component: <JobListBody type={'interviewing'} jobs={props.interviewing}/>
    },
    {
      key: 'Offer Stage',
      component: <JobListBody type={'offer'} jobs={props.offerStage}/>
    },
    {
      key: 'Archive',
      component: <JobListBody type={'archive'} jobs={props.archived} />
    },
  ]

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<FaPlusSquare className={classes.icon}/>}
          aria-controls="Add-content"
          id="Add"
          className={classes.summary}
        >
          <Typography variant="h6" className={classes.font}>
            Applied to a Job? Track it Here!
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <AddJob />
        </ExpansionPanelDetails>
      </ExpansionPanel>
        
      { panels.map(panel => (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.icon}/>}
            aria-controls={panel.key + '-content'}
            id={panel.key}
            className={classes.summary}
          >
            <Typography variant="h6" className={classes.font}>
              {panel.key}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPadding}>
            {panel.component}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}


