import React from 'react'
import { AppPlatformManagementClient } from "@azure/arm-appplatform";
import {InteractiveBrowserCredential} from '@azure/identity'
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import * as Constants from '../constants'
import {useEntity} from '@backstage/plugin-catalog-react'
import {AsaeConfig, EntityAsae} from '../types'
import {
      StatusError,
      StatusOK,
      StatusPending,
      StatusRunning
    } from '@backstage/core-components';
export const getCompatibleLanguages = (buildpack : string) => {

    switch(buildpack){
        case "tanzu-buildpacks/java-azure":
            return "JVM languages"
        case "tanzu-buildpacks/dotnet-core":
            return "C#, F#, Visual Basic"
        case "tanzu-buildpacks/go":
            return "Go"
        case "tanzu-buildpacks/nodejs":
            return "Node.js"
        case "tanzu-buildpacks/python":
            return "python"
        default:
            return null;
    }
}

export const getAsaeConfig  = ():AsaeConfig => {
    const config = useApi(configApiRef);
    const asaeConfig = {
        tenantId: config.getString(Constants.CONFIG_ASAE_CREDENTIALS_TENTANT_ID),
        clientId: config.getString(Constants.CONFIG_ASAE_CREDENTIALS_CLIENT_ID)
    } as AsaeConfig
    return asaeConfig
}

export const getAsaeClient  = (asaeConfig : AsaeConfig, anotations:EntityAsae) : AppPlatformManagementClient => {
    const credential = new InteractiveBrowserCredential({
        tenantId: asaeConfig.tenantId,
        clientId: asaeConfig.clientId
      });
      const client = new AppPlatformManagementClient(credential, anotations.subscriptionId);
      return client
}

export const getAsaeEntityInfo = ():EntityAsae=>{
    const {entity} = useEntity()
    const entiytyAsae = {
     resourceGroup : entity?.metadata?.annotations?.[Constants.ASAE_RESOURCE_GROUP]??'MISSING', 
     asaeService : entity?.metadata?.annotations?.[Constants.ASAE_SERVICE_NAME]??'MISSING',
     buildServiceName : entity?.metadata?.annotations?.[Constants.ASAE_BUILD_SERVICE_NAME]??'default',
     subscriptionId : entity?.metadata?.annotations?.[Constants.CONFIG_ASAE_SUBSCRIPTION_ID]??'MISSING'
    } as EntityAsae
    return entiytyAsae
}

export const getStatusComponent = (status:string|undefined) : JSX.Element =>  {
    switch(status){
        case 'Succeeded':
            return <StatusOK>{status} </StatusOK>
        case 'Updating':
            return <StatusRunning>{status} </StatusRunning>
        case 'Failed':
            return <StatusError>{status}</StatusError>
    }
    return <StatusPending>{status}</StatusPending>
}

