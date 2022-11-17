const { AppPlatformManagementClient } = require("@azure/arm-appplatform");
const { InteractiveBrowserCredential } = require("@azure/identity");
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import * as Constants from '../constants'

type AsaeConfig = {
    resourceGroup:string
    serviceName:string
    buildServiceName:string
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
        resourceGroup: config.getOptionalString(Constants.ASAE_RESOURCE_GROUP) ?? 'NONE_PRIVIDED',
        serviceName: config.getOptionalString(Constants.ASAE_SERVICE_NAME) ?? 'NONE_PRIVIDED',
        buildServiceName: config.getOptionalString(Constants.ASAE_BUILD_SERVICE_NAME) ?? 'NONE_PRIVIDED',
        subscriptionId: config.getOptionalString(Constants.CONFIG_ASAE_SUBSCRIPTION_ID) ?? 'NONE_PRIVIDED',
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

