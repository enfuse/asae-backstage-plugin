
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@mui/material';
import React, {PropsWithChildren} from 'react'
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles<Theme>(
    theme => ({
      status: {
        fontWeight: "bold",
        '&::before': {
          width: '0.7em',
          height: '0.7em',
          display: 'inline-block',
          marginRight: theme.spacing(1),
          borderRadius: '50%',
          content: '""',
        },
      },
      ok: {
        '&::before': {
          backgroundColor: "#1DB954",
        },
      },
      error: {
        '&::before': {
          backgroundColor: "#E22134",
        },
      }
    }
  ));
  
  export function StatusOK(props: PropsWithChildren<{}>) {
    const classes = useStyles(props);
    return (
      <Typography
        component="span"
        className={classNames(classes.status, classes.ok)}
        aria-label="Status ok"
        aria-hidden="true"
        {...props}
      />
    );
  }

  export function StatusError(props: PropsWithChildren<{}>) {
    const classes = useStyles(props);
    return (
      <Typography
        component="span"
        className={classNames(classes.status, classes.error)}
        aria-label="Status error"
        aria-hidden="true"
        {...props}
      />
    );
  }