export interface Config {
  /**
   * @visibility frontend
   */
    asae?: {
        /**
         * resourceGroup ASAE lives on
         * @visibility frontend
         */
        resourceGroupName?: string
        /**
         * Azure Spring Apps instance name
         * @visibility frontend
         */
         serviceName?: string
        /**
         * buildServiceName (always default)
         * @visibility frontend
         */
         buildServiceName?: string
        /**
         * SubscriptionId the resource lives under
         * @visibility frontend
         */
        subscriptionId?: string
        /**
         * Credentials used to fetch information from resource.
         * @visibility frontend
         */
        credentials?: {
            /**
             * tenantId 
             * @visibility frontend
             */
            tenantId: string
            /**
             * clientId
             * @visibility frontend
             */
            clientId: string
        }
    }
}