import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { TableColumn, Table } from '@backstage/core-components';
import { withAzureClient,DataProps} from '../common/withAzureClient';
import { BuildpacksError } from '../AzureBuildPacksComponent/BuildpacksError';
import * as Utils from '../../utils/asae-utils'
import * as Types from '../../types/buildpacks-types'


export const AzureBuildPacksComponent = ({value}: DataProps) => {
  const title="Available Buildpacks"
  const columns: TableColumn[] = [
    { title: 'Buildpack', field: 'buildpack' },
    { title: 'Supported Languages', field: 'languages' },
    { title: 'Builder', field: 'builder' },
  ];
  const data = value.map((item: { buildpack: any; builder: any; languages: any; }) => {
    return {
      buildpack: item.buildpack,
      builder: item.builder,
      languages: item.languages
    }
  });
   return <Table data={data} columns={columns} title={title}  options={{ search: true, paging: false }}   />;
};

const azureBuildpacksCallback = (client : any, asaeConfig: any) => {

  const { value, loading, error } = useAsync(async (): Promise<Types.SupportedBuildpacks[]> => {
      const builders: Types.AsaeBuilder[]= []
      const builderIterator = client.buildServiceBuilder.list(asaeConfig.resourceGroup, 
        asaeConfig.serviceName, 
        asaeConfig.buildServiceName)
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
