const REACT_APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REACT_APP_OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN;
const REACT_APP_URL = process.env.REACT_APP_URL; 

export const oktaConfig = {
  clientId: `${REACT_APP_CLIENT_ID}`,
  issuer: `https://${REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  redirectUri: `${REACT_APP_URL}/login/callback`, // this makes it so redirects to login if not logged in for secure routes
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};