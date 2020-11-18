const fs = require('fs');
const path = require('path');

module.exports = (plop) => {
  plop.setHelper('getExport', (fullPath) => {
    const fileName = path.basename(fullPath, '.js');
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const hasDefaultExport = fileContents.search('export default');
    return hasDefaultExport > -1 ? fileName : `* as ${fileName}`;
  });
  plop.setDefaultInclude({ helpers: true });
};
