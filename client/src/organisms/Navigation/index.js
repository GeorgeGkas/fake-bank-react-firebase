/**
 * Import globals.
 */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

/**
 * Create component styles.
 */
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    textAlign: 'center',
  },
  activeLink: {
    fontWeight: 'bold',
    color: '#ee0256 !important',
  },
  link: {
    textDecoration: 'none',
    color: '#222222',
  },
}))

/**
 * Component.
 */
const Navigation = () => {
  const classes = useStyles()

  return (
    <Paper square>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={4} md={2}>
          <NavLink
            exact
            to="/"
            activeClassName={classes.activeLink}
            className={classes.link}
          >
            <Typography variant="button">Home</Typography>
          </NavLink>
        </Grid>
        <Grid item xs={4} md={2}>
          <NavLink
            to="/balance"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <Typography variant="button">Balance</Typography>
          </NavLink>
        </Grid>
        <Grid item xs={4} md={2}>
          <NavLink
            to="/create"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <Typography variant="button">Create Account</Typography>
          </NavLink>
        </Grid>
        <Grid item xs={4} md={2}>
          <NavLink
            to="/delete"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <Typography variant="button">Delete Account</Typography>
          </NavLink>
        </Grid>
        <Grid item xs={4} md={2}>
          <NavLink
            to="/deposit"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <Typography variant="button">Deposit</Typography>
          </NavLink>
        </Grid>
        <Grid item xs={4} md={2}>
          <NavLink
            to="/withdrawal"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <Typography variant="button">Withdrawal</Typography>
          </NavLink>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Navigation
