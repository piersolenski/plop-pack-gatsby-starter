const fs = require('fs');
const { isEmpty, isURL } = require('validator');

module.exports = function (plop) {
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
        validate: (value) => !isEmpty(value) || 'Required',
      },
      {
        type: 'input',
        name: 'description',
        message: `Enter project description`,
        validate: (value) => !isEmpty(value) || 'Required',
      },
      {
        type: 'input',
        name: 'url',
        message: `Enter project url`,
        validate: (value) => isURL(value) || 'Must be a valid URL',
      },
      {
        type: 'input',
        name: 'repository',
        message: `Enter project repository url`,
        validate: (value) => isURL(value) || 'Must be a valid URL',
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
