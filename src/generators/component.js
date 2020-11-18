const fs = require('fs');
const checkboxPlus = require('inquirer-checkbox-plus-prompt');
const getImports = require('../utils/get-imports');

module.exports = (plop) => {
  const rootDir = plop.getDestBasePath();
  const componentDirectories = fs.readdirSync(`${rootDir}/src/components`);

  plop.load('../partials/importList.js');
  plop.setPrompt('checkbox-plus', checkboxPlus);

  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
      {
        type: 'list',
        name: 'componentDirectory',
        message: 'Select component directory',
        choices: componentDirectories,
      },
      {
        type: 'checkbox-plus',
        name: 'imports',
        message: 'Select imports',
        highlight: true,
        searchable: true,
        default: ['components/about/Main'],
        source: (answers, prevInput) => getImports(prevInput, `${rootDir}/src`),
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{componentDirectory}}/{{properCase name}}.js',
        templateFile: '../templates/component.hbs',
      },
    ],
  });
};
