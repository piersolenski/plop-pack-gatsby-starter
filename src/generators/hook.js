const { isEmpty } = require('validator');

module.exports = (plop) => {
  const hookName = 'use{{properCase (stripUsePrefix name)}}';
  plop.setHelper('stripUsePrefix', (str) => str.replace('use', ''));
  plop.setPartial('hookName', hookName);
  plop.setGenerator('hook', {
    description: 'Create a new hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: `What is your hook's name?`,
        validate: (value) => !isEmpty(value) || 'Required',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `src/hooks/${hookName}.js`,
        templateFile: '../templates/hook.hbs',
      },
    ],
  });
};
