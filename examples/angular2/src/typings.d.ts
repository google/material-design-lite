/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  export * from '@angular/platform-browser';
}

declare module 'angular2/testing' {
  export * from '@angular/core/testing';
}

declare module 'angular2/http/testing' {
  export * from '@angular/http/testing';
}
