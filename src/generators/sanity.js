module.exports = (plop) => {
  plop.load('plop-pack-npm-install-packages');
  plop.setGenerator('sanity', {
    description: 'Add Sanity CMS to your project',
    prompts: [
      {
        type: 'input',
        name: 'projectId',
        message: 'Enter your projectId',
      },
      {
        type: 'input',
        name: 'dataset',
        message: 'Enter your dataset',
      },
      {
        type: 'input',
        name: 'token',
        message: 'Enter your token',
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
      },
      {
        type: 'append',
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
