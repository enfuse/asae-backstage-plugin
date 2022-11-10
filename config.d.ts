export interface Config {
  /**
   * @visibility frontend
   */
    asae?: {
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