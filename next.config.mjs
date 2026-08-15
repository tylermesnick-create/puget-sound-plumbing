/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't fetch Google Fonts at build time — the browser loads them at runtime
  // via the <link> in app/layout.tsx. Keeps builds working without network access.
  optimizeFonts: false,
};

export default nextConfig;
