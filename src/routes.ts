import { createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'azure-spring-apps',
});

export const asaeConfigurationRouteRef = createRouteRef({
  id: 'azure-spring-apps-configuration',
});
