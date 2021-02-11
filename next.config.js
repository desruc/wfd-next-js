module.exports = {
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    // Will be available on both server and client
    greeting: process.env.NEXT_PUBLIC_TEMPLATE_GREETING,
    apiBase:
      process.env.API_BASE_ROUTE &&
      process.env.API_BASE_ROUTE.indexOf('http') === 0
        ? process.env.API_BASE_ROUTE
        : `https://${process.env.API_BASE_ROUTE}`,
    portalBase: process.env.PORTAL_BASE_ROUTE
  }
};
