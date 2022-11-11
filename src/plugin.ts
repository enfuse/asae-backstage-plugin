import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
import { rootRouteRef,asaeConfigurationRouteRef } from './routes';
import * as Constants from './constants'
import { Entity } from '@backstage/catalog-model';


export const isAsaeBuildpacksBuilderNameAvailable = (entity : Entity) => 
   Boolean(entity.metadata.annotations?.[Constants.ASAE_RESOURCE_GROUP_ANNOTATION] && 
    entity.metadata.annotations?.[Constants.ASAE_SERVICE_NAME_ANNOTATION]&&
    entity.metadata.annotations?.[Constants.ASAE_BUILD_SERVICE_NAME_ANNOTATION])

export const azureSpringAppsPlugin = createPlugin({
  id: 'azure-buildpacks',
  routes: {
    root: rootRouteRef,
  },
});

export const AzureBuildpacksPage = azureSpringAppsPlugin.provide(
  createRoutableExtension({
    name: 'AzureBuildpacksPage',
    component: () =>
      import('./components/AzureBuildPacksComponent').then(m => m.AsaeBuildPacksWithAzureClient),
    mountPoint: rootRouteRef,
  }),
);
export const AzureConfigServicePage = azureSpringAppsPlugin.provide(
  createRoutableExtension({
    name: 'AzureConfigServicePage',
    component: () =>
      import('./components/AzureBuildPacksComponent').then(m => m.AsaeBuildPacksWithAzureClient),
    mountPoint: asaeConfigurationRouteRef,
  }),
);

