const { isEmpty } = require('validator');
const isSvg = require('is-svg');

module.exports = (plop) => {
  plop.load('../helpers/svgr');
  plop.setGenerator('icon', {
    description: 'Create a SVGR icon',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: `What is your icon's name?`,
        validate: (value) => !isEmpty(value) || 'Required',
      },
      {
        type: 'editor',
        name: 'code',
        message: `Add your SVG code to the editor then close to continue...`,
        validate: (value) => isSvg(value) || `Not a valid SVG!`,
      },
    ],
    actions: [
      {
        type: 'add',
        force: true,
        templateFile: '../templates/icon.hbs',
        path: 'src/icons/{{properCase name}}.js',
      },
    ],
  });
};
