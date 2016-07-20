/** @fileoverview Bootstraps the test bundle for karma-webpack. */

const testsContext = require.context('.', true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);
