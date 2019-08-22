import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

/**
 * ProfileCard component styles
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexDirection: 'row'
    }
  }
}));

/**
 * User profile card displaying image, name and more
 */
const ProfileCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        component="img"
        alt="TODO: name"
        height="100%"
        image="https://avatars2.githubusercontent.com/u/34765317?s=460&v=4"
        title="TODO: name"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Brennan D Baraban
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          bdbaraban
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          Cohort 7
        </Typography>
        <IconButton size="small" color="primary">
          <FaGithub />
        </IconButton>
        <IconButton size="small" color="primary">
          <FaLinkedin />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
