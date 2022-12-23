import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import {Table,
        TableBody,
        TableCell,
        TableHead,
        TableRow,
        Paper} from '@mui/material';
import { useStyles } from '../common/styles';
import { withAzureClient,DataProps} from '../common/withAzureClient';
import {TitleWithFilterSearch} from '../common/TitleWithFilterSearch'
import { BuildpacksError } from '../AzureBuildPacksComponent/BuildpacksError';
import * as Utils from '../../utils/asae-utils'
import * as Types from '../../types'
import { TableContainer } from '@material-ui/core';


export const AzureBuildPacksComponent = ({value}: DataProps) => {
  const classes = useStyles()
  const [search, setSearch] = React.useState('')
  const handleSearch = (e) => { setSearch(e.target.value)}
  return (
    <>
    <TitleWithFilterSearch  handleSearch={handleSearch} title="Available Buildpacks" />
    <TableContainer component={Paper}>
      <Table aria-label='Buildpacks'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} >Buildpack</TableCell>
            <TableCell className={classes.tableCell} >Builder</TableCell>
            <TableCell className={classes.tableCell} >Supported Languages</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {value.map(item => {
            if(item?.buildpack?.toLowerCase().includes(search.toLowerCase()) ||
             item?.builder?.toLowerCase().includes(search.toLowerCase()) ||
             item?.languages?.toLowerCase().includes(search.toLowerCase()) )
            return <TableRow className={classes.tableRow} key={item.buildpack+item.builder}>
                <TableCell className={classes.tableCell}>{item.buildpack}</TableCell>
                <TableCell className={classes.tableCell}>{item.builder}</TableCell>
                <TableCell className={classes.tableCell}>{item.languages}</TableCell>
              </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
          </>
  )
}
const azureBuildpacksCallback = (client : any, entityAsaeInfo: Types.EntityAsae) => {
  const { value, loading, error } = useAsync(async (): Promise<Types.SupportedBuildpacks[]> => {
      const builders: Types.AsaeBuilder[]= []
      const builderIterator = client.buildServiceBuilder.list(entityAsaeInfo.resourceGroup, 
        entityAsaeInfo.asaeService, 
        entityAsaeInfo.buildServiceName)
      for await (const val of builderIterator){
        builders.push(val)
      }
      const buildpacksBuilders = builders.map((builder:Types.AsaeBuilder)=>{
        const buildpacks:Types.AsaeBuildpack[][] = []
        builder.properties.buildpackGroups.map(group=>buildpacks.push(group.buildpacks.flat() as Types.AsaeBuildpack[]))
        return {
          name: builder.name,
          buildpacks: buildpacks.flat()
        }
      })
      const buildPacks : Types.SupportedBuildpacks[][] = buildpacksBuilders.map(({name, buildpacks}): Types.SupportedBuildpacks[] => {
       return buildpacks.map((buildpack : Types.AsaeBuildpack) : Types.SupportedBuildpacks => {
          return {
            builder: name,
            buildpack: buildpack.id,
            languages: Utils.getCompatibleLanguages(buildpack.id)
          }
        })
      })
        return buildPacks.flat()
    },[]);
    return { value, loading, error }
}
export const AsaeBuildPacksWithAzureClient = withAzureClient(AzureBuildPacksComponent, 
                                                          BuildpacksError,
                                                          azureBuildpacksCallback)
