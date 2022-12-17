
import { Box, Chip, Collapse, Paper } from '@mui/material'
import { AsaeApp } from '../../types'
import React from 'react'
import { useStyles } from "../common/styles";
import { DataProps } from '../common/withAzureClient';

export const  AppEndpoints = ( {asaeApp}:any) =>{
    return (
      <Paper elevation={6} sx={{background: asaeApp.endpoints.length > 0? 'default':'e6e8e6'}} >
        <Box sx={{ padding: 1, paddingLeft:4 }}>
          <h2>Endpoints</h2>
          {asaeApp?.endpoints?.map(endpoint=>
            <Endpoint endpoint={endpoint} ></Endpoint>
          )}
        </Box>
    </Paper>
    )
  }

const Endpoint = (props : {endpoint}) => {
    const {endpoint} = props 
    const headers = endpoint?.details?.requestMappingConditions?.headers
    const params = endpoint?.details?.requestMappingConditions?.params
    const consumes = endpoint?.details?.requestMappingConditions?.consumes
    const produces = endpoint?.details?.requestMappingConditions?.produces
    const [open, setOpen] = React.useState(false)
    const classes = useStyles()
    console.log(produces)
    return (
        <Box >
        <p onClick={()=>setOpen(!open)} className={classes.rowClass}>
          <b> <EndpointMethod  method={endpoint?.details?.requestMappingConditions?.methods[0]} /> </b>
        {endpoint?.details?.requestMappingConditions?.patterns[0]}
        </p>
        {/* <Collapse in={open} timeout="auto" unmountOnExit sx={{padding:0, margin:0}}>
            <Box sx={{ paddingLeft:4}}>

            <p><b>Headers&nbsp;</b>
            {headers.map(header => <>{header}&nbsp;</>)}
            </p>
            <p> <b>Params&nbsp;</b></p>
            {params.map(param => {
                <p>{param}</p>
            })}
            <p><b>Consumes&nbsp;</b></p>
            {consumes.map(consumeItem => {
                <p>{consumeItem}</p>
            })}
            <p><b>Produces&nbsp;</b>
            {produces.map(produceItem =>  <>{produceItem.mediaType}&nbsp;</>)}
            </p>
            </Box>
        </Collapse> */}
      </Box>
    )

}

const EndpointMethod = (props :{method:string}) => {
    const {method} = props
    return (
        <>
        {
            {
                'GET': <Chip label="GET" color="success"></Chip>,
                'POST': <Chip label="POST" color="primary"></Chip>,
                'PUT': <Chip label="PUT" color="info"></Chip>,
                'DELETE': <Chip label="DELETE" color="error" ></Chip>
            }[method]
        }
        </>
    )
}