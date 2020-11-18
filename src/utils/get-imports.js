const glob = require('glob');
const fuzzy = require('fuzzy');

const getPotentialImports = (dir) => {
  return glob.sync(`${dir}{*.js,!(pages)/**/*.js}`, {}).map((fullPath) => ({
    value: fullPath,
    name: fullPath.replace(`${dir}/`, '').replace('.js', ''),
  }));
};

module.exports = function getImports(prevInput, dir) {
  const potentialImports = getPotentialImports(dir);
  const input = prevInput || '';
  return new Promise((resolve) => {
    const filtered = fuzzy.filter(input, potentialImports, {
      extract(item) {
        return item.name;
      },
    });
    const data = filtered.map((element) => element.original);
    resolve(data);
  });
};
