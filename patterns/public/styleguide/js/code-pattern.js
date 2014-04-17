/*!
 * Code View Support for Patterns - v0.3
 *
 * Copyright (c) 2013 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 */

var codePattern = {
	
	codeOverlayActive:  false,
	codeEmbeddedActive: false,
	
	/**
	* toggle the annotation feature on/off
	* based on the great MDN docs at https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage
	* @param  {Object}      event info
	*/
	receiveIframeMessage: function(event) {
		
		// does the origin sending the message match the current host? if not dev/null the request
		if ((window.location.protocol != "file:") && (event.origin !== window.location.protocol+"//"+window.location.host)) {
			return;
		}
		
		if (event.data.codeToggle != undefined) {
			
			// if this is an overlay make sure it's active for the onclick event
			codePattern.codeOverlayActive  = false;
			codePattern.codeEmbeddedActive = false;
			
			// see which flag to toggle based on if this is a styleguide or view-all page
			var body = document.getElementsByTagName("body");
			if ((event.data.codeToggle == "on") && (body[0].classList.contains("sg-pattern-list"))) {
				codePattern.codeEmbeddedActive = true;
			} else if (event.data.codeToggle == "on") {
				codePattern.codeOverlayActive  = true;
			}
			
			// if comments embedding is turned off make sure to hide the annotations div
			if (!codePattern.codeEmbeddedActive && (body[0].classList.contains("sg-pattern-list"))) {
				var els = document.getElementsByClassName("sg-code");
				for (var i = 0; i < els.length; i++) {
					els[i].style.display = "none";
				}
			}
			
			// if comments overlay is turned on add the has-comment class and pointer
			if (codePattern.codeOverlayActive) {
				
				var targetOrigin = (window.location.protocol == "file:") ? "*" : window.location.protocol+"//"+window.location.host;
				obj = { "codeOverlay": "on", "lineage": lineage, "html": document.getElementById("sg-pattern-html").textContent, "css": document.getElementById("sg-pattern-css").textContent };
				parent.postMessage(obj,targetOrigin);
				
			} else if (codePattern.codeEmbeddedActive) {
				
				// if code embedding is turned on simply display them
				var els = document.getElementsByClassName("sg-code");
				for (var i = 0; i < els.length; ++i) {
					els[i].style.display = "block";
				}
				
			}
			
		}
		
	}
	
};

// add the onclick handlers to the elements that have an annotations
window.addEventListener("message", codePattern.receiveIframeMessage, false);

// before unloading the iframe make sure any active overlay is turned off/closed
window.onbeforeunload = function() {
	var obj = { "codeOverlay": "off" };
	var targetOrigin = (window.location.protocol == "file:") ? "*" : window.location.protocol+"//"+window.location.host;
	parent.postMessage(obj,targetOrigin);
};