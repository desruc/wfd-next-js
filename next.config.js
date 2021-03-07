module.exports = {
  env: {
    API_BASE_ROUTE:
      process.env.API_BASE_ROUTE &&
      process.env.API_BASE_ROUTE.indexOf('http') === 0
        ? process.env.API_BASE_ROUTE
        : `https://${process.env.API_BASE_ROUTE}`
  },
  serverRuntimeConfig: {
    apiBase:
      process.env.API_BASE_ROUTE &&
      process.env.API_BASE_ROUTE.indexOf('http') === 0
        ? process.env.API_BASE_ROUTE
        : `https://${process.env.API_BASE_ROUTE}`
  },
  publicRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV,
    apiBase:
      process.env.API_BASE_ROUTE &&
      process.env.API_BASE_ROUTE.indexOf('http') === 0
        ? process.env.API_BASE_ROUTE
        : `https://${process.env.API_BASE_ROUTE}`
  }
};
