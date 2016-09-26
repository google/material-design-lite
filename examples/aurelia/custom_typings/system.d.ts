declare module 'system' {
  import fetch = require('isomorphic-fetch');
  import offline = require('offline-plugin/runtime');
  import * as Aurelia from 'aurelia-framework';

  /*
   * List your dynamically imported modules to get typing support
   */
  interface System {
    import(name: string): Promise<any>;
    import(name: 'aurelia-framework'): Promise<typeof Aurelia>;
    import(name: 'isomorphic-fetch'): Promise<typeof fetch>;
    import(name: 'offline-plugin/runtime'): Promise<typeof offline>;
  }

  global {
    var System: System;
  }
}
