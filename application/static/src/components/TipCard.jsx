import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// TipCard component styles
const useStyles = makeStyles({
  margin: {
    marginBottom: 12
  }
});

/**
 * Tip card displayed on home page.
 * Generates random tip every page render.
 */
const TipCard = () => {
  const classes = useStyles();
  const [tip, setTip] = useState({});

  const tips = [
    {
      tip: `Always negotiate! You can increase your salaray by up to 10-30%.`,
      author: 'Michelle Lai'
    },
    {
      tip: `Where's your water bottle!`,
      author: 'Athena Deng, Cohort 7'
    },
    {
      tip: `Your portfolio is never finished; it's all about those incremental improvements.`,
      author: 'Brennan D Baraban, Cohort 7'
    }
  ];

  useEffect(() => {
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography className={classes.margin} color="textSecondary">
          Tips
        </Typography>
        <Typography variant="h6" className={classes.margin}>
          {tip.tip}
        </Typography>
        <Typography color="textSecondary">- {tip.author}</Typography>
      </CardContent>
    </Card>
  );
};

export default TipCard;
