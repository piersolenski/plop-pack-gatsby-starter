module.exports = (plop) => {
  const rootDir = plop.getDestBasePath();
  plop.setHelper('getImportPath', (fullPath) => {
    return fullPath.replace('.js', '').replace(`${rootDir}/src/`, '');
  });
  plop.setDefaultInclude({ helpers: true });
};
