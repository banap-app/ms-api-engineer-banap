export default () => ({
  http: {
    baseURL: process.env.HTTP_BASE_URL, // auth service url
    timeout: parseInt(process.env.HTTP_TIMEOUT) || 5000,
    maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS) || 5,
  },
});
