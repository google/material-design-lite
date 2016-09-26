/// <reference path="../node_modules/@types/whatwg-fetch/index.d.ts" />
interface URLSearchParams {}
declare module "isomorphic-fetch" {
  export = fetch;
}