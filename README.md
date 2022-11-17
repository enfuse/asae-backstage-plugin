# Azure Spring Apps (ASAE) Plugin
The Azure Spring App plugin displays status and configuration information about your Azure Spring Apps  cluster to Backstage. Currently the plugin only shows information around enabled build-packs. 

![Azure Buildpacks](./docs/buildpacks.png)
> Plugin has only been tested using Enterprise tier

# Releases
## v1.0.0 
- Display all the builders availble to compile your applications source code. 

# Requirements
In order to use the Azure Spring Application plugin, you must have a working Azure Spring Application cluster.

1. An active [Azure Subscription](https://azure.microsoft.com/en-us/free/)
2. An [Azure Spring Apps Cluster](https://learn.microsoft.com/en-us/azure/spring-apps/) under your subscription
3. A [Backstage](https://backstage.io/docs/getting-started/) application instance

# Installation

1. Install the plugin with `yarn` in the root of your Backstage directory

```sh
yarn --cwd packages/app add @enfuse/plugin-azure-spring-apps
```

2. Import and use the plugin in your catalog page. Example code below:

``` js
/*  packages/app/src/components/catalog/EntityPage.tsx  */
...
import { AzureBuildpacksPage } from '@enfuse/plugin-azure-spring-apps';

const systemPage = (
...
    <EntityLayout.Route 
       path="/azure-buildpacks" title="Azure Buildpacks">
        <AzureBuildpacksPage></AzureBuildpacksPage>
    </EntityLayout.Route>
    // or wherever your heart desires
```
# Configuration
1. This plugin requires credential and cluster configuration details. This should be provided in the backstage configuration as shown below:

```yml
//app-config.yml or app-config-local.yml
azureBuildpacks:
  resourceGroupName: <resource-group>
  serviceName: <asae-service-name>
  buildServiceName: default // Azure Spring Apps only has a default value for now
  subscriptionId: <subscription-id>
  credentials:
    tenantId: <tenant-id>
    clientId: <client-id>
```

> You can find this information on the Azure Spring App cluster overview page, see screenshot below:
![ASAE INFO](./docs/asae-info.png)
 
> You also need to provide a tenantId and a clientId from an AD app registration in order for our app to be able to authenticate users [(guide to generate can be found here)](https://learn.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app). The plugin will authenticate the user in a popup window. Whoever signs in should have the appropriate permissions (READ) on the cluster.

