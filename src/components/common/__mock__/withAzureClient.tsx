
import React from 'react'
import { DataProps } from '../withAzureClient'
export const withAzureClient = (Component :  React.ComponentType<DataProps> ,
    ErrorComponent :  React.ComponentType<any> ,
    callback : Function) : React.FC  => () => {
    // const asaeConfig = Utils.getAsaeConfig()
    // const client = Utils.getAsaeClient(asaeConfig)
    // const data = callback(client,asaeConfig);

    // if (data.loading) 
    // return <Progress />;
    // else if (data.error) 
    // return <ErrorComponent error={data.error}/>
    const data = {}
return <Component {...data as DataProps}/>
}