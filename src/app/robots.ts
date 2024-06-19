export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: 'https://shrinkifier.com/sitemap.xml',
    host: 'https://shrinkifier.com',
  };
}
