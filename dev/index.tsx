import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { AzureBuildpacksPage, azureSpringAppsPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(azureSpringAppsPlugin)
  .addPage({
    element: <AzureBuildpacksPage />,
    title: 'Root Page',
    path: '/azure-spring-apps'
  })
  .render();
