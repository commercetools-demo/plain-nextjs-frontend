import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,

  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/ts-client';

const config = {
  projectKey: process.env.NEXT_PUBLIC_CTP_PROJECT_KEY || '',
  apiRoot: process.env.NEXT_PUBLIC_CTP_API_URL || '',
  authRoot: process.env.NEXT_PUBLIC_CTP_AUTH_URL || '',
  credentials: {
    clientId: process.env.NEXT_PUBLIC_CTP_CLIENT_ID || '',
    clientSecret: process.env.NEXT_PUBLIC_CTP_CLIENT_SECRET || '',
  },
  scopes: [process.env.NEXT_PUBLIC_CTP_SCOPES || ''],
}

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: config.authRoot,
  projectKey: config.projectKey,
  credentials: config.credentials,
  scopes: config.scopes,
  httpClient: fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: config.apiRoot,
  httpClient: fetch,
};


// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

  export const commercetoolsClient = createApiBuilderFromCtpClient(ctpClient)
  .withProjectKey({ projectKey: config.projectKey });

  
