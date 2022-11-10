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