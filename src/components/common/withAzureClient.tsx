import React from 'react'
import * as Utils from '../../utils/asae-utils'
import { Progress } from '@backstage/core-components';

export type DataProps = {
    value:any,
  }
export type AsaeConfig = {
    resourceGroupName: string,
    serviceName: string,
    buildServiceName: string,
}

export const withAzureClient = (Component :  React.ComponentType<DataProps> ,
                                ErrorComponent :  React.ComponentType<any> ,
                                callback : Function) : React.FC  => () => {
    const asaeConfig = Utils.getAsaeConfig()
    const client = Utils.getAsaeClient(asaeConfig)
    const data = callback(client,asaeConfig);
    
    if (data.loading) 
      return <Progress />;
    else if (data.error) 
      return <ErrorComponent error={data.error}/>
    
    return <Component {...data as DataProps}/>
}
