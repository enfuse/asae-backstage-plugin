import React from 'react'
// import { TableColumn, Table } from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';
import { AppPlatformManagementClient,AppResource, AppResourceProperties, BindingResource, ConfigurationServiceResource, ManagedIdentityProperties } from "@azure/arm-appplatform";

import { withAzureClient,DataProps} from '../common/withAzureClient';
import * as Types from '../../types'
import * as Utils from '../../utils/asae-utils'
import { AsaeAppListError } from './AsaeAppListError';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {StatusError,StatusOK } from '@backstage/core-components';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    rowClass: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgb(242, 247, 245)"
      }
    },
    collapsedContent: {
        "div > p" :{
            padding:0,
            margin:0
        },
        "div > h4" :{
            padding:0,
            margin:0
        }
    },
    notPresent:{
        color: '#888',
        fontWeight: 550,
        fontStyle: 'italic',
        fontSize: '0.8rem'
    }
})

export type AsaeApp = {
    id:string,
    appName:string,
    location:string,
    provisioningState:JSX.Element,
    identity:ManagedIdentityProperties,
    properties:AppResourceProperties
}

function Row( props: {asaeApp: AsaeApp} ) {
  const {asaeApp} = props
  const [open, setOpen] = React.useState(false);
  const classes = useStyles()
  return (
        <React.Fragment>
            <TableRow className={classes.rowClass}  onClick={()=>setOpen(!open)}> 
                <TableCell sx={{border:0}}>{asaeApp.appName}</TableCell >
                <TableCell sx={{border:0}} >{asaeApp.provisioningState}</TableCell>
                <TableCell sx={{border:0}}>{asaeApp.location}</TableCell>
            </TableRow>
            <TableRow className={classes.collapsedContent}>
                <TableCell sx={{border:0}} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                        <Paper>
                            <Box sx={{ padding: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} >
                                        <Paper elevation={6}>
                                            <Box sx={{ padding: 2, paddingLeft:4}}>
                                                <h2><i>{asaeApp.appName}</i></h2>
                                                <Grid container spacing={5}>
                                                    <Grid item xs={6}>
                                                        <div>
                                                            <p><b>Domain </b>{asaeApp?.properties?.fqdn}</p>
                                                            <p><b>URL </b>{asaeApp?.properties?.url}</p>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={6} >
                                                        <div>
                                                            <p>{asaeApp?.properties?.enableEndToEndTLS? <StatusOK>END-TO-END-TLS</StatusOK>:<StatusError>END-TO-END-TLS</StatusError>}</p>
                                                            <p>{asaeApp?.properties?.httpsOnly? <StatusOK>HTTPS-ONLY</StatusOK>:<StatusError>HTTPS-ONLY</StatusError>}</p>
                                                            <p>{asaeApp?.properties?.public? <StatusOK>PUBLIC</StatusOK>:<StatusError>PUBLIC</StatusError>}</p>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Paper elevation={6}>
                                            <Box sx={{ padding: 1, paddingLeft:4 }}>
                                                <h2>Storage</h2>
                                        <Grid container spacing={5}>
                                            <Grid item xs={6}>
                                            <div>
                                                <h3>Temporary</h3>
                                                <p><b>Mount Path</b> {asaeApp?.properties?.temporaryDisk?.mountPath}</p>
                                                <p><b>Size </b>{asaeApp?.properties?.temporaryDisk?.sizeInGB}Gb</p>
                                            </div>
                                            </Grid>
                                            <Grid item xs={6} >
                                            <div>
                                                <h3>Persistent</h3>
                                                <p><b>Mount Path</b> {asaeApp?.properties?.persistentDisk?.mountPath}</p>
                                                <p><b>Size </b>{asaeApp?.properties?.persistentDisk?.sizeInGB}Gb</p>
                                            </div>
                                            </Grid>
                                        </Grid>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Paper elevation={6} sx={{background : !asaeApp?.identity?.principalId ? '#e6e8e6' : 'default'}}>
                                            <Box sx={{ padding: 1, paddingLeft:4 }}>
                                        {!asaeApp?.identity?.principalId && <p className={classes.notPresent}>Identify Information not provided</p>}
                                        <h2>Identity</h2>
                                            <div data-testid="identity-test">
                                                <p><b>Principal ID </b>{asaeApp?.identity?.principalId}</p>     
                                                <p><b>Tenant ID </b>{asaeApp?.identity?.tenantId}</p>
                                                <p><b>Type </b>{asaeApp?.identity?.type}</p>
                                            </div>
                                                
                                            </Box>
                                        </Paper>
                                    </Grid>
                        </Grid>
                    </Box> 
                    </Paper>
                </Collapse>
                 </TableCell>
            </TableRow> 
     </React.Fragment>
  );
}

export const AsaeAppsList =({value}:DataProps) =>{
  return (

    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" >
        <TableHead>
          <TableRow>
            <TableCell>App Name</TableCell>
            <TableCell >Provisioning State</TableCell>
            <TableCell >Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {value.map((item:AsaeApp) => (
            <Row key={item.id} asaeApp={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}


export const asaeAppListCallback = (client : AppPlatformManagementClient, entityAsaeInfo: Types.EntityAsae)=>{
    const { value, loading, error } = useAsync(async (): Promise<AppResource[]> => {
        const apps: AppResource[]= []
        const appsInterator = client.apps.list(entityAsaeInfo.resourceGroup, entityAsaeInfo.asaeService)
        for await (const app of appsInterator){ apps.push(app) }
        const asaeApps : AsaeApp[] = apps.map( (app:AppResource)=>{
            return {
                id: app.id,
                appName:app.name,
                location:app.location,
                provisioningState: Utils.getStatusComponent(app?.properties?.provisioningState),
                identity: app.identity,
                properties: app.properties
            } as AsaeApp
        })

        return asaeApps
      },[]);
      return { value, loading, error }
}

export const AsaeBuildPacksWithAzureClient = withAzureClient(AsaeAppsList, 
    AsaeAppListError,
    asaeAppListCallback)