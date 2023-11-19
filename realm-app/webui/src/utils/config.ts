export const Config = {
  cookies:{
    AUTH: `${process.env.REACT_APP_ID}-auth` || 'local-app',
    AUTH_TYPE: `${process.env.REACT_APP_ID}-auth-type`,
    OPTIONS: { path: '/', maxAge: 24 * 60 * 60 },
  },
  okta: {
    clientId : process.env.REACT_APP_OKTA_CLIENT_ID  || '',
    issuer : process.env.REACT_APP_OKTA_ISSUER  || ''
  },
  app: {
    title: process.env.REACT_APP_TITLE  || 'App title'
  },
  realmAppId: process.env.REACT_APP_REALM_APPID || '',
  dashboardId: process.env.REACT_APP_DASHBOARD_ID || '',
  chartBaseUrl: process.env.REACT_APP_CHARTS_BASE_URL || '',
  gClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || ''
}