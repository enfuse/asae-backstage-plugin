import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';
import { rootRouteRef,asaeAppsListtRouteRef } from './routes';


// export const isAsaeBuildpacksBuilderNameAvailable = () => {
//    return true//( Utils.getAsaeConfig() == null ? false:true)
// }

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
export const AsaeAppsListPage = azureSpringAppsPlugin.provide(
  createRoutableExtension({
    name: 'AsaeAppsListPage',
    component: () =>
      import('./components/AsaeAppList/AsaeAppList').then(m => m.AsaeBuildPacksWithAzureClient),
    mountPoint: asaeAppsListtRouteRef,
  }),
);


