/**
 * PostCSS plugin wrapper that applies @tailwindcss/postcss only to non-Payload files.
 *
 * Tailwind v4's PostCSS plugin strips Payload CMS's @layer declarations,
 * producing empty CSS chunks and breaking the admin panel. This wrapper
 * intercepts processing and skips files from @payloadcms packages.
 */
const tailwindPlugin = require('@tailwindcss/postcss');

module.exports = (opts) => {
  const tw = tailwindPlugin(opts);
  const originalPlugins = tw.plugins || [];

  const wrappedPlugins = originalPlugins.map((p) => {
    if (!p.Once) return p;
    const originalOnce = p.Once;
    return {
      ...p,
      postcssPlugin: p.postcssPlugin,
      async Once(root, helpers) {
        const file = helpers.result?.opts?.from || root.source?.input?.file || '';
        if (file.includes('payloadcms') || file.includes('@payloadcms')) {
          return;
        }
        return originalOnce.call(this, root, helpers);
      },
    };
  });

  return {
    ...tw,
    postcssPlugin: 'tailwindcss-skip-payload',
    plugins: wrappedPlugins,
  };
};
module.exports.postcss = true;
