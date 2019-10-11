import runtimeEnv from '@mars/heroku-js-runtime-env/';
const env = runtimeEnv();


export default function getBaseUrl() {
  const baseURL = process.env.NODE_ENV === 'production' 
    ? env.REACT_APP_PRODUCTION_BACKEND_BASE_URL 
    : process.env.REACT_APP_BACKEND_BASE_URL;

  return baseURL;
}
