# MDL Checkbox Example - Angular2

This folder contains a POC for using mdl-checkbox within Angular2.

It is based off of [angular2-seed](https://github.com/angular/angular2-seed)

## Setup

1. Run `npm install` within this folder
2. Run `npm start` to start the demo server
3. Navigate to http://localhost:3000 to view the demo.

## Notes

The checkbox wrapper is implemented within `src/app/components/checkbox/checkbox.ts`. There are also
simple wrapper components for both the checkbox wrapper classes and the checkbox label (which is
implemented as a directive).

Also note that our example takes full advantage of TS's awesome type system. For now, we have
manually added an interface for the checkbox's adapter. However, we will eventually be shipping type
definitions along with our components, so you'll get this for free!
