/**
 * Import globals.
 */
import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

/**
 * Create component styles.
 */
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))

/**
 * Component.
 */
const Deposit = () => {
  const classes = useStyles()
  const [loading, setLoadingState] = React.useState(false)
  const [requestEnd, setRequestEndState] = React.useState(false)
  const [responseValue, setResponseValue] = React.useState(null)

  const deposit = async () => {
    const accountId = document.getElementById('account_id').value
    const accountHolder = document.getElementById('account_holder').value
    const depositAmount = document.getElementById('deposit_amount').value

    setRequestEndState(false)
    setLoadingState(true)
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_ENDPOINT}/accounts/deposit`,
        {
          id: accountId,
          holder: accountHolder,
          amount: depositAmount,
        },
        {
          withCredentials: true,
        },
      )

      if (response.status === 204) {
        setResponseValue(
          `Successfully deposit ${depositAmount} coins to account with id "${accountId}".`,
        )
      } else {
        setResponseValue(response.data.message)
      }
    } catch (e) {
      setResponseValue(e.response.data.message)
    }
    setLoadingState(false)
    setRequestEndState(true)
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item xs={7}>
          <Paper square className={classes.paper}>
            <Typography gutterBottom variant="h5">
              Deposit
            </Typography>

            <form noValidate autoComplete="off">
              <div>
                <TextField
                  id="account_id"
                  label="Account ID"
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="account_holder"
                  label="Account Holder"
                  className={classes.textField}
                  margin="normal"
                />
                <TextField
                  id="deposit_amount"
                  label="Deposit Amount"
                  className={classes.textField}
                  margin="normal"
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={deposit}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Paper>
          {loading && (
            <Paper square className={classes.paper}>
              <Typography variant="body1">Processing request...</Typography>
            </Paper>
          )}
          {!loading && requestEnd && (
            <Paper square className={classes.paper}>
              <Typography variant="body1">{responseValue}</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Deposit
