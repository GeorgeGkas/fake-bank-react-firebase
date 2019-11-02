/**
 * Import globals.
 */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Create component styles.
 */
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

/**
 * Component.
 */
const Account = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item xs={7}>
          <Paper square className={classes.paper}>
            <Typography gutterBottom variant="h5">
              Welcome to Fake Bank APP.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Account
