import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { azureSpringAppsPlugin, AzureSpringAppsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(azureSpringAppsPlugin)
  .addPage({
    element: <AzureSpringAppsPage />,
    title: 'Root Page',
    path: '/azure-spring-apps'
  })
  .render();
