/*
 * Custom Type Definitions
 * When including 3rd party modules you also need to include the type definition for the module
 * if they don't provide one within the module. You can try to install it with typings

typings install node --save

 * If you can't find the type definition in the registry we can make an ambient definition in
 * this file for now. For example

declare module "my-module" {
  export function doesSomething(value: string): string;
}

 *
 * If you're prototying and you will fix the types later you can also declare it as type any
 *

declare var assert: any;

 *
 * If you're importing a module that uses Node.js modules which are CommonJS you need to import as
 *

import * as _ from 'lodash'

 * You can include your type definitions in this file until you create one for the typings registry
 * see https://github.com/typings/registry
 *
 */

// Alias legacy import/exports pre rc
declare module "angular2/core" {
  export * from '@angular/core';
}

declare module "angular2/http" {
  export * from '@angular/http';
}

declare module 'angular2/platform/browser' {
  export * from '@angular/platform-browser'
}

declare module 'angular2/testing' {
  export * from '@angular/core/testing';
}

declare module 'angular2/http/testing' {
  export * from '@angular/http/testing';
}
