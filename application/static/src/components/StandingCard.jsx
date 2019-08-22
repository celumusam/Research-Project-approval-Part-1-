import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Emoji from './Emoji';

/**
 * StandingCard component styles
 */
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  header: {
    background: theme.palette.text.grey,
    width: '100%'
  },
  titleTypographyProps: {
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  content: {
    textAlign: 'center'
  },
  box: {
    marginTop: theme.spacing(2)
  },
  good: {
    background: theme.palette.text.green
  },
  bad: {
    background: theme.palette.error.light
  }
}));

/**
 * Career Sprint standing card
 */
const StandingCard = () => {
  const classes = useStyles();

  const createData = (name, count, goal) => {
    return {
      name,
      count,
      goal
    };
  };

  const rows = [
    createData('This Week', 20, 5),
    createData('Last 3 Weeks', 10, 15),
    createData('Average', 35),
    createData('Total', 35)
  ];

  const GoodStanding = (
    <Typography variant="h6">
      <Emoji label="raising-hands" symbol="🙌" /> Good Standing{' '}
      <Emoji label="raising-hands" symbol="🙌" />
    </Typography>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        titleTypographyProps={{ className: classes.titleTypographyProps }}
        title="Your Career Sprint Standing"
      />
      <CardContent className={classes.content}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Time Span</TableCell>
              <TableCell align="right"># Applications</TableCell>
              <TableCell align="right">Goal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, 2).map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell
                  align="right"
                  className={row.count < row.goal ? classes.bad : classes.good}
                >
                  {row.count}
                </TableCell>
                <TableCell
                  align="right"
                  className={row.count < row.goal ? classes.bad : classes.good}
                >
                  {row.goal}
                </TableCell>
              </TableRow>
            ))}
            {rows.slice(2, 4).map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right" />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box className={classes.box}>{GoodStanding}</Box>
      </CardContent>
    </Card>
  );
};

export default StandingCard;
