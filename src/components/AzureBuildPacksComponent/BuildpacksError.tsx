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
            <AlertTitle>Possible Misconfiguration, check these values in your app-config.yml</AlertTitle>
            {Constants.ASAE_SERVICE_NAME }  <br/>
            {Constants.ASAE_RESOURCE_GROUP }  <br/>
            {Constants.ASAE_BUILD_SERVICE_NAME } <br/>
            {Constants.CONFIG_ASAE_SUBSCRIPTION_ID }  <br/>
            {Constants.CONFIG_ASAE_CREDENTIALS_CLIENT_ID }  <br/>
            {Constants.CONFIG_ASAE_CREDENTIALS_TENTANT_ID }  <br/><br/>
            {props.error.message}
          </Alert>
}