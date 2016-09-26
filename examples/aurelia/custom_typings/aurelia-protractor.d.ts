// Type definitions for Aurelia Protractor extensions
// Project: https://github.com/aurelia/skeleton-navigation
// Definitions by: Enrapt <https://github.com/Enrapt>, Kirill Grishin <https://github.com/KirillGrishin>

// Extend existing interfaces with additional functionality from Aurelia Protractor Extender (aurelia.protractor.js)
import * as protractor from 'protractor'
declare module 'protractor' {
  interface Browser {
    loadAndWaitForAureliaPage(url: string): any;
    waitForRouterComplete(): any;

    // this should eventually be defined externally:
    switchTo(): any;
  }

  interface ProtractorBy {
    valueBind(bindTarget: string): Locator;
  }
}
