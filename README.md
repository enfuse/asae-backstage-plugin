# Azure Spring Apps Enterprise (ASAE) Plugin
Welcome to the azure-spring-apps plugin!



# Getting started

Download the package into the root of your backstage project

```sh
yarn --cwd packages/app add @backstage/plugin-spring-azure-apps
```

### Configuration
This plug in fetches information using the Azure Rest API, which uses credentials in order to authenticate the calls. You need a tenantId and a clientId from an AD app registration. The plugin will authenticate the user in a popup window. Whoever signs in should have the appropiate permissions to interact with the resources from the Azure.

You will also need extra information about your resources. (You can leave the buildServiceName as default for now)

```yml
azureBuildpacks:
  resourceGroupName: <resource-group>
  serviceName: <asae-service-name>
  buildServiceName: default
  subscriptionId: <subscription-id>
  credentials:
    tenantId: <tenant-id>
    clientId: <client-id>
```
Use the extension in your catalog, and place inside the section you want the comopnent to appear on. Make sure to place the component inside a **EntityLayout.Route** in order to create a tab for the section. This is optional, feel free to use the component as it best serves your needs

``` js
/*  packages/app/src/components/catalog/EntityPage.tsx  */
...
import { AzureBuildpacksPage,isAsaeBuildpacksBuilderNameAvailable } from '@backstage/plugin-azure-spring-apps';


...
    <EntityLayout.Route 
      if={isAsaeBuildpacksBuilderNameAvailable}
       path="/azure-buildpacks" title="Azure Buildpacks">
        <AzureBuildpacksPage></AzureBuildpacksPage>
    </EntityLayout.Route>
```

