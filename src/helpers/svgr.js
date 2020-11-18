const svgr = require('@svgr/core').default;

module.exports = (plop) => {
  plop.setDefaultInclude({ helpers: true });
  plop.setHelper('svgr', (code, name) => {
    return svgr
      .sync(
        code,
        {
          dimensions: false,
          titleProp: true,
          plugins: [
            '@svgr/plugin-svgo',
            '@svgr/plugin-jsx',
            '@svgr/plugin-prettier',
          ],
        },
        { componentName: name }
      )
      .replace(
        'aria-labelledby={titleId}',
        'aria-labelledby={title ? titleId : null}'
      );
  });
};
