import { createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'azure-spring-apps',
});
export const asaeAppsListtRouteRef = createRouteRef({
  id: 'asae-apps-list',
});
export const asaeExternalConfigurationRouteRef = createRouteRef({
  id: 'asae-external-config',
});

