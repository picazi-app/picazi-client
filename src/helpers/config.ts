const BASE_URL = "http://localhost:4000";
const PRODUCTION_URL = "https://desolate-stream-98688.herokuapp.com/";

export default function getBaseUrl() {
  const baseURL = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : BASE_URL
  return baseURL;
}
