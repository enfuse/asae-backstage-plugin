import { AppResourceProperties, ManagedIdentityProperties } from "@azure/arm-appplatform";

export type SupportedBuildpacks = {
    buildpack: string;
    builder: string
    languages: string | null
  }
  
  export type AsaeBuilder = {
    id: string;
    name: string;
    properties: AsaeBuilderProps;
    systemData: {};
    type: string;
  }
  
  export type AsaeBuilderProps = {
    buildpackGroups: AsaeBuildPackGroup[];
    stack: {};
    provisioningState: string;
  }
  
  export type AsaeBuildPackGroup = {
    buildpacks: AsaeBuildpack[];
    name:string;
  }
  export type AsaeBuildpack = {
    id:string
  }

  export type AsaeConfig = {
    tenantId:string
    clientId:string
}
export type EntityAsae = {
    resourceGroup:string
    asaeService:string
    subscriptionId:string
    buildServiceName:string
}

export type AsaeApp = {
  id:string,
  appName:string,
  location:string,
  provisioningState:JSX.Element,
  identity:ManagedIdentityProperties,
  properties:AppResourceProperties,
  state: string,
  endpoints: []
}