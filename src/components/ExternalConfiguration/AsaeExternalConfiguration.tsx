import React from 'react'
import useAsync from 'react-use/lib/useAsync';

import {Paper, Box, Grid} from '@mui/material';

import { DataProps, withAzureClient} from '../common/withAzureClient';
import {AsaeError} from '../common/AsaeError'
import {EntityAsae} from '../../types'
import { AppPlatformManagementClient, ConfigurationServiceResource } from '@azure/arm-appplatform';
import { Typography } from '@material-ui/core';
import { useStyles } from "../common/styles";

export const ExternalConfiguration = ({value}: DataProps)=>{
    const classes = useStyles()
    let singleResource 
    if(value.length >0){
        singleResource=value[0]
    }
    return (
        <Paper sx={{padding:2}}>
            <Box>
                <Paper elevation={6} sx={{padding:2, marginBottom:2}}>
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={6}>
                            <Box>
                                <Typography variant='h6'>Status</Typography>
                                <p><b>Instances&nbsp;</b>{singleResource.properties.resourceRequests.instanceCount}</p>
                                <p><b>CPU&nbsp;</b>{singleResource.properties.resourceRequests.cpu}</p>
                                <p><b>Memory&nbsp;</b>{singleResource.properties.resourceRequests.memory}</p>
                                <p><b>Provisioning State&nbsp;</b>{singleResource.properties.provisioningState}</p>
                            </Box>
                        </Grid>
                        <Grid item sm={12} md={6}>
                                <Box>
                                <Typography variant='h6'>Instances</Typography>
                                    {singleResource.properties.instances.map(instance=>(
                                        <>
                                        <p><b>Name&nbsp;</b>{instance.name}</p>
                                        <p><b>Status&nbsp;</b>{instance.status}</p>
                                        </>
                                    ))}
                                </Box>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper elevation={6} sx={{padding:3}}>
                    <Typography variant="h6">Repos</Typography>
                    <Grid container spacing={2}>
                    {singleResource.properties.settings.gitProperty.repositories.map(repo=>(
                        <Grid item  sm={12} md={6}  >
                        <Paper sx={{padding:2, marginBottom:2}} className={classes.configPatternList}>
                            <p><b>Name&nbsp;</b>{repo.name}</p>
                            <p><b>Uri&nbsp;</b>{repo.uri}</p>
                            <p><b>Label&nbsp;</b>{repo.label}</p>
                            <p><b>Patterns&nbsp;</b>
                                    <ul>
                            {repo.patterns.map(pattern=>(
                                <li>{pattern}&nbsp;</li>
                                ))}
                                </ul>
                            </p>
                        </Paper>
                        </Grid>
                    ))}
                    </Grid>
                </Paper>
            </Box>
        </Paper>
    )
}
const AsaeExternalConfigurationCallback = (client :  AppPlatformManagementClient, entityAsaeInfo : EntityAsae)=>{
    const {value, loading, error } =  useAsync(async () : Promise <ConfigurationServiceResource[]> => {
        const configurationServiceResource : ConfigurationServiceResource[] = []
        const configResourceIterator = client.configurationServices.list(entityAsaeInfo.resourceGroup, entityAsaeInfo.asaeService)
        for await (const configServiceResource of configResourceIterator  ) {
            configurationServiceResource.push(configServiceResource)
        }
        return await configurationServiceResource

    }, [])
    return {value, loading, error}
}
export const AsaeExternalConfiguration = withAzureClient(
    ExternalConfiguration,
    AsaeError,
    AsaeExternalConfigurationCallback
)