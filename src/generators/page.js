const checkboxPlus = require('inquirer-checkbox-plus-prompt');
const getImports = require('../utils/get-imports');

module.exports = (plop) => {
  const rootDir = plop.getDestBasePath();
  plop.setPrompt('checkbox-plus', checkboxPlus);
  plop.load('../partials/importList.js');

  plop.setGenerator('page', {
    description: 'Create a new page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: `What is your page's name?`,
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
        path: 'src/pages/{{dashCase name}}.js',
        templateFile: '../templates/page.hbs',
      },
    ],
  });
};
