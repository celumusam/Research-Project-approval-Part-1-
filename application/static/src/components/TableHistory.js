import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TableCard from './TableCard';
import getUrl from './tools/getUrl';
import { getCookie } from './tools/userTools.js';

const styles = theme => ({
  body: {
    flexGrow: 1,
    position: 'relative',
    marginTop: '5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '4rem',
      paddingRight: '4rem',
    },
  }
});

class TableHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applied: undefined,
      interviewing: undefined,
      offerStage: undefined,
      archived: undefined,
    }
    this.modifyValues = this.modifyValues.bind(this);
  }
  
  componentDidMount() {
    const user_id = getCookie('user_id');
    const url = getUrl('/api/user/' + user_id + '/jobs');
    $.ajax({
      type: 'GET',
      url: url,
      success: results => {
        this.setState({
          applied: results['applied'],
	  interviewing: results['screening'],
	  offerStage: results['offerStage'],
	  archived: results['archived'],
        });
      }
    });
  }
  
  modifyValues(type, section, data) {
    const user_id = getCookie('user_id');
    const url = getUrl('/api/user/' + user_id + '/jobs');
    $.ajax({
      type: type,
      url: url,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: data => {
        let list = []
        let results = data['updated_jobs']
        Object.keys(results).forEach(key => {
	  list.push({ ...results[key], id: key });
        });
        this.setState({
          applied: list,
        });
      },
    });
  }

  render() {
    const { classes, handleToken } = this.props;
    const { applied, interviewing, offerStage, archived } = this.state;
    return (
        <div className={ classes.body }>
          <TableCard section="Applied" values={ applied } modifyValues={ this.modifyValues } />
          <TableCard section="Screening" values={ interviewing } modifyValues={ this.modifyValues } />
          <TableCard section="Offer Stage" values={ offerStage } modifyValues={ this.modifyValues } />
          <TableCard section="Rejected" values={ archived } modifyValues={ this.modifyValues } />
        </div>
    )
  }
}

export default withStyles(styles)(TableHistory);

/*
          <TableCard section="Interviewing" />
          <TableCard section="Offer Stage" />
          <TableCard section="Archived" />
          */
