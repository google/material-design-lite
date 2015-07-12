// Export componentHandler in Meteor.
(function() {
'use strict';
/*global Meteor:true*/
if (typeof Meteor === 'object' && Meteor.isClient === true) {
  // When in a Meteor package, componentHandler is not global.
  // Attach it to window object.
  window.componentHandler = componentHandler;
  // Attach to Meteor object?
  //Meteor.mdlComponentHandler = componentHandler;
}
})();
