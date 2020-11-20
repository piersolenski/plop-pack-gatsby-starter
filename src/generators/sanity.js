const { isEmpty } = require('validator');

module.exports = (plop) => {
  plop.load('plop-pack-npm-install-packages');
  plop.setGenerator('sanity', {
    description: 'Add Sanity CMS to your project',
    prompts: [
      {
        type: 'input',
        name: 'projectId',
        message: 'Enter your projectId',
        validate: (value) => !isEmpty(value) || 'Required',
      },
      {
        type: 'input',
        name: 'dataset',
        message: 'Enter your dataset',
        default: 'production',
        validate: (value) => !isEmpty(value) || 'Required',
      },
      {
        type: 'input',
        name: 'token',
        message: 'Enter your token',
        validate: (value) => !isEmpty(value) || 'Required',
      },
    ],
    actions: [
      {
        type: 'add',
        path: './.env',
        template: '',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: './.env',
        templateFile: '../templates/sanity-env.hbs',
        unique: true,
      },
      {
        type: 'append',
        unique: true,
        path: './gatsby-config.js',
        pattern: /(plugins: \[)/g,
        templateFile: '../templates/sanity-config.hbs',
      },
      {
        type: 'npmInstallPackages',
        install: 'gatsby-source-sanity',
      },
    ],
  });
};
