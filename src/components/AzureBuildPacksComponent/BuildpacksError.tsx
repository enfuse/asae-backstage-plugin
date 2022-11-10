import React from 'react'
import * as Constants from '../../constants'

import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

type Error = {
  name: string;
  message: string;
  stack?: string;
};

export const BuildpacksError = (props : {error :Error} ) => {
    return <Alert severity="error" variant='outlined'>
            <AlertTitle>Possible Misconfiguration</AlertTitle>
            {Constants.ASAE_SERVICE_NAME_ANNOTATION }  <br/>
            {Constants.ASAE_RESOURCE_GROUP_ANNOTATION }  <br/>
            {Constants.ASAE_BUILD_SERVICE_NAME_ANNOTATION } <br/>
            {Constants.CONFIG_ASAE_SUBSCRIPTION_ID }  <br/><br/>
            {props.error.message}
          </Alert>
}