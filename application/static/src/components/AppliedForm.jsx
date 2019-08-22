import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import dateToString from '../tools/dateToString';
import getUrl from '../tools/getUrl';
import Emoji from './Emoji';

/**
 * AppliedForm component styles
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%'
  },
  menu: {
    width: 200
  },
  interior: {
    marginTop: '24px'
  },
  notes: {
    height: 136
  },
  success: {
    backgroundColor: theme.palette.text.green
  },
  icon: {
    color: theme.palette.common.black,
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    color: theme.palette.common.black,
    display: 'flex',
    alignItems: 'center'
  }
}));

/**
 * Form for submitting applied jobs
 */
const AppliedForm = props => {
  const classes = useStyles();

  const today = dateToString(new Date());

  const interviewProgressOptions = [
    '',
    'Recruiter Call',
    'Tech Screen',
    'Coding Challenge',
    'Onsite',
    'Phone Interview',
    'Awaiting Decision'
  ];

  const statusOptions = [
    '',
    'Applied',
    'Interviewing',
    'Offer Stage',
    'Archived',
    'Rejected'
  ];

  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [url, setUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [dateApplied, setDateApplied] = useState(today);
  const [status, setStatus] = useState('');
  const [interviewProgress, setInterviewProgress] = useState('');

  const [open, setOpen] = useState(false);

  const [companyError, setCompanyError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const statusInputLabel = useRef(null);
  const interviewProgressInputLabel = useRef(null);
  const [statusLabelWidth, setStatusLabelWidth] = useState(0);
  const [
    interviewProgressLabelWidth,
    setInterviewProgressLabelWidth
  ] = useState(0);
  useEffect(() => {
    setStatusLabelWidth(statusInputLabel.current.offsetWidth);
    setInterviewProgressLabelWidth(
      interviewProgressInputLabel.current.offsetWidth
    );
  }, []);

  // Submit applied job to API
  const handleSubmit = () => {
    let flag = false;
    if (company.trim() === '') {
      setCompanyError(true);
      flag = true;
    } else if (companyError === true) {
      setCompanyError(false);
    }
    if (address.trim() === '') {
      setAddressError(true);
      flag = true;
    } else if (addressError === true) {
      setAddressError(false);
    }
    if (title.trim() === '') {
      setTitleError(true);
      flag = true;
    } else if (titleError === true) {
      setTitleError(false);
    }

    if (!flag) {
      // This would be called after the post request in production
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2750);

      /* Posting commented out for testing
      fetch(getUrl('/api/jobs/applied'), {
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          company,
          job_title: title,
          location: address,
          url,
          notes,
          date_applied: dateApplied,
          status,
          interview_progress: interviewProgress
        })
      }).then(data => {
        setCompany('');
        setTitle('');
        setAddress('');
        setUrl('');
        setNotes('');
        setDateApplied(today);
        setStatus('');
        setInterviewProgress('');

        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2750);

        props.handleToken(data.token);
      });
      */
    }
  };

  // Close the snackbar
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            error={companyError}
            id="company"
            variant="outlined"
            label="Company Name"
            value={company}
            onChange={event => setCompany(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            error={titleError}
            id="title"
            variant="outlined"
            value={title}
            label="Job Title"
            onChange={event => setTitle(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                error={addressError}
                id="address"
                variant="outlined"
                label="Office Location (City, State, Country)"
                value={address}
                onChange={event => setAddress(event.target.value)}
              />
              <TextField
                fullWidth
                id="url"
                variant="outlined"
                label="URL"
                className={classes.interior}
                value={url}
                onChange={event => setUrl(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                InputProps={{ className: classes.notes }}
                fullWidth
                multiline
                id="notes"
                variant="outlined"
                label="Notes"
                rows={4}
                value={notes}
                onChange={event => setNotes(event.target.value)}
                placeholder="Important Notes (Contact Info, Tips, etc.)"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="date"
            variant="outlined"
            label="Date Applied"
            type="date"
            defaultValue={today}
            onChange={event => setDateApplied(event.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel ref={statusInputLabel} htmlFor="status">
              Status
            </InputLabel>
            <Select
              native
              value={status}
              onChange={event => setStatus(event.target.value)}
              input={
                <OutlinedInput
                  name="status"
                  labelWidth={statusLabelWidth}
                  id="status"
                />
              }
            >
              {statusOptions.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel
              ref={interviewProgressInputLabel}
              htmlFor="interview-progress"
            >
              Interview Progress
            </InputLabel>
            <Select
              native
              value={interviewProgress}
              onChange={event => setInterviewProgress(event.target.value)}
              input={
                <OutlinedInput
                  name="interviewProgress"
                  labelWidth={interviewProgressLabelWidth}
                  id="interview-progress"
                />
              }
            >
              {interviewProgressOptions.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            margin="normal"
            variant="contained"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        children={
          <SnackbarContent
            className={classes.success}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <CheckCircleIcon
                  className={clsx(classes.icon, classes.iconVariant)}
                />
                Application received. Good luck!
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        }
      />
    </div>
  );
};

export default AppliedForm;
