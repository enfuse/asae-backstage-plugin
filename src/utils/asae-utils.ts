const { AppPlatformManagementClient } = require("@azure/arm-appplatform");
const { InteractiveBrowserCredential } = require("@azure/identity");
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import * as Constants from '../constants'
import { useEntity } from '@backstage/plugin-catalog-react';

type AsaeConfig = {
    subscriptionId:string
    tenantId:string
    clientId:string
}
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

export const getAsaeConfig = ()=>{
    const config = useApi(configApiRef);
    const asaeConfig = {
        subscriptionId: config.getOptionalString(Constants.CONFIG_ASAE_SUBSCRIPTION_ID) ?? 'defaults',
        tenantId: config.getString(Constants.CONFIG_ASAE_CREDENTIALS_TENTANT_ID),
        clientId: config.getString(Constants.CONFIG_ASAE_CREDENTIALS_CLIENT_ID)
    }
    return asaeConfig
}

export const getAsaeClient  = (asaeConfig : AsaeConfig) : typeof AppPlatformManagementClient => {
    const credential = new InteractiveBrowserCredential({
        tenantId: asaeConfig.tenantId,
        clientId: asaeConfig.clientId
      });
      const client = new AppPlatformManagementClient(credential, asaeConfig.subscriptionId);
      
      return client
}

export const AsaeEntityAnnotations = () => {
    const {entity} = useEntity();
    return {
         resourceGroup : entity?.metadata?.annotations?.[Constants.ASAE_RESOURCE_GROUP_ANNOTATION],
         serviceName : entity?.metadata?.annotations?.[Constants.ASAE_SERVICE_NAME_ANNOTATION],
         buildServiceName : entity?.metadata?.annotations?.[Constants.ASAE_BUILD_SERVICE_NAME_ANNOTATION]
    }
}