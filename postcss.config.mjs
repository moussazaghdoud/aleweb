/** @type {import('postcss-load-config').Config} */
export default (ctx) => {
  const file = ctx.file || '';
  // Skip Tailwind processing for Payload CMS admin CSS.
  // Tailwind v4's @tailwindcss/postcss plugin strips Payload's
  // @layer payload-default declarations, producing empty CSS chunks.
  if (file.includes('@payloadcms') || file.includes('payloadcms')) {
    return { plugins: {} };
  }
  return {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  };
};
