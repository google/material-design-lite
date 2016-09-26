# aurelia-skeleton-webpack

## Getting started

Before you start, make sure you have a recent version of [NodeJS](http://nodejs.org/) environment *>=4.0* with NPM 3.

From the project folder, execute the following commands:

```shell
npm install
```

This will install all required dependencies, including a local version of Webpack that is going to
build and bundle the app. There is no need to install Webpack globally. 

To run the app execute the following command:

```shell
npm start
```

This command starts the webpack development server that serves the build bundles.
You can now browse the skeleton app at http://localhost:9000. Changes in the code
will automatically build and reload the app.

## Feature configuration

Most of the configuration will happen in the `webpack.config.js` file.
There, you may configure advanced loader features or add direct SASS or LESS loading support.

## Bundling

To build a development bundle (output to /dist) execute:

```shell
npm run build
```

To build an optimized, minified production bundle (output to /dist) execute:

```shell
npm run build:prod
```

To test either the development or production build execute:

```shell
npm run server:prod
```

The production bundle includes all files that are required for deployment.

## Resource and bundling configuration

You may want to separate out parts of your code to other files.
This can be done by specifying a build resource object inside `package.json`. 

For example, if you wanted to lazy-load the /users path of the skeleton you could define it as follows:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      {
        "path": "users",
        "bundle": "users",
        "lazy": true
      }
    ]
  }
},
```

The "path" field can be either a string or an array of strings. 
The string should be a path, relative to the src or in case of an external resource, as a require path (e.g. `aurelia-plugin/some-resource.html`).
`.js`, `.ts` and `.html` extensions are optional and will be resolved automatically.
The bundle setting is recursive, therefore any files required by the specified path will also be contained by the bundle, unless they are also contained by another one (iteration is done from first to last resource).

Resources must also be specified in case Aurelia is supposed to load an external file or an external module that was not defined as a resource by any of the dependencies.
Since the syntax is still relatively new, most Aurelia plugins don't define their resources. 
There might also be reasons not to declare those resources, in case the plugin is to be consumed only partially.
If you'd like to use external resources, you should declare them yourself, like so:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      "aurelia-some-ui-plugin/dropdown",
      "aurelia-some-ui-plugin/checkbox"
    ]
  }
},
```

You can also combine both features to separate out plugins or resources for lazy-loading:

```js
// (package.json)
"aurelia": {
  "build": {
    "resources": [
      {
        "path": "aurelia-animator-css",
        "bundle": "animator",
        "lazy": true
      },
      {
        "path": [
          // lets say we only use the checkbox from within subpage1
          // we want those to be bundled together in a bundle called: "subpage1"
          "aurelia-some-ui-plugin/checkbox",
          "./items/subpage1"
        ],
        "bundle": "subpage1",
        "lazy": true
      },
      "aurelia-some-ui-plugin/dropdown"
    ]
  }
},
```

Please see https://github.com/aurelia/webpack-plugin for more information.

## Running The Unit Tests

To run the unit tests:

```shell
npm run test
```

## Running The E2E Tests
Integration tests are performed with [Protractor](http://angular.github.io/protractor/#/).

1. Place your E2E-Tests into the folder ```test/e2e/src```

2. Run the tests by invoking

  ```shell
  npm run e2e
  ```

### Running e2e tests manually

1. Make sure your app runs and is accessible

  ```shell
  WEBPACK_PORT=19876 npm start
  ```

3. Once bundle is ready, run the E2E-Tests in another console

  ```shell
  npm run e2e:start
  ```

## Electron (coming soon)

To add Electron support to the skeleton, first run:

```shell
npm run electron:setup
```

Once the packages are installed, you may either view your app in Electron or build application packages for production:

```shell
# developing on Electron with live-reload
npm run electron:start

# creates packages for the current operating system
npm run electron:package

# creates packages for all operating systems
npm run electron:package:all
```

The entry-file for Electron can be found in `config/electron.entry.development.ts`.

Building or creating the Electron package will create a file `electron.js` in the root directory of the skeleton.

### Loading native packages in Electron

If you have packages that cannot work in the Electron Renderer process (e.g. native packages), or wish to use the package in the renderer process as if it is running under Node, list them under `externals`, in the file `config/webpack.electron.js`.

## Acknowledgments

Parts of code responsible for Webpack configuration were inspired by or copied from @AngularClass' [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter).

Parts of code responsible for Webpack-Electron configuration and packaging were inspired by or copied from @chentsulin's [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate).
