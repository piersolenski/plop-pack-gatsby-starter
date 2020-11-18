module.exports = (plop) => {
  plop.load('../helpers/svgr');
  plop.setGenerator('icon', {
    description: 'Create a SVGR icon',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: `What is your icon's name?`,
        validate: (value) => (value ? true : 'Pass a valid value'),
      },
      {
        type: 'editor',
        name: 'code',
        message: `Add your SVG code to the editor then close to continue...`,
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
