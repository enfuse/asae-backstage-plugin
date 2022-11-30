import React from 'react'
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

type Error = {
  name: string;
  message: string;
  stack?: string;
};

export const AsaeAppListError = (props : {error :Error} ) => {
    return <Alert severity="error" variant='outlined'>
            <AlertTitle>Error in ASAE App list component</AlertTitle>
            {props.error.message}
          </Alert>
}