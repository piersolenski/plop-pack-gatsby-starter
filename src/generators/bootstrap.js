const fs = require('fs');

module.exports = (plop) => {
  const rootDir = plop.getDestBasePath();
  const readmePath = `${rootDir}/README.md`;
  plop.load('../actions/jsonEdit.js');
  plop.setGenerator('bootstrap', {
    description: 'Bootstrap your project',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: `Enter project name`,
      },
      {
        type: 'input',
        name: 'description',
        message: `Enter project description`,
      },
      {
        type: 'input',
        name: 'url',
        message: `Enter project url`,
      },
      {
        type: 'input',
        name: 'repository',
        message: `Enter project repository url`,
      },
    ],
    actions: [
      {
        type: 'add',
        path: readmePath,
        force: true,
        // eslint-disable-next-line consistent-return
        skip() {
          const readme = fs.readFileSync(readmePath, 'utf-8');
          if (!readme.includes('<!-- Default README -->')) {
            return 'README already updated';
          }
        },
        templateFile: '../templates/readme.hbs',
      },
      {
        type: 'jsonEdit',
        path: `${rootDir}/package.json`,
      },
    ],
  });
};
