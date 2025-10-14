export default function httpConfig() {
  return {
    http: {
      baseURL: process.env.HTTP_BASE_URL,
      timeout: parseInt(process.env.HTTP_TIMEOUT, 10) || '5000',
      maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS10) || '5',
    },
  };
}
