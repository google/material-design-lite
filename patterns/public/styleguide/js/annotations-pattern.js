/*!
 * Annotations Support for Patterns - v0.3
 *
 * Copyright (c) 2013 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 */

var annotationsPattern = {
	
	commentsOverlayActive:  false,
	commentsOverlay:        false,
	commentsOverlayElement: "",
	commentsEmbeddedActive: false,
	commentsEmbedded:       false,
	
	/**
	* add an onclick handler to each element in the pattern that has an annotation
	*/
	showComments: function() {
		
		// make sure this only added when we're on a pattern specific view
		var body = document.getElementsByTagName("body");
		if (!body[0].classList.contains("sg-pattern-list")) {
			for (comment in comments.comments) {
				var item = comments.comments[comment];
				var els  = document.querySelectorAll(item.el);
				for (var i = 0; i < els.length; ++i) {
					els[i].onclick = (function(item) {
						return function(e) {
							e.preventDefault();
							e.stopPropagation();
							var obj = {};
							
							if (annotationsPattern.commentsOverlayActive && !annotationsPattern.commentsOverlay) {
								
								// if this is for an overlay and comments overlay is false set the payload to turn the overlay on
								annotationsPattern.commentsOverlay = true;
								obj = { "commentOverlay": "on", "swapOverlay": false, "el": item.el, "title": item.title, "comment": item.comment };
								
							} else if (annotationsPattern.commentsOverlayActive && annotationsPattern.commentsOverlay) {
								
								if (item.el == annotationsPattern.commentsOverlayElement) {
									
									// if the last element was clicked again turn off the overlay
									annotationsPattern.commentsOverlay = false;
									obj = { "commentOverlay": "off" };
									
								} else {
									
									// if an element was clicked on while the overlay was already on swap it
									obj = { "commentOverlay": "on", "swapOverlay": true, "el": item.el, "title": item.title, "comment": item.comment };
									
								}
								
							}
							
							annotationsPattern.commentsOverlayElement = item.el;
							var targetOrigin = (window.location.protocol == "file:") ? "*" : window.location.protocol+"//"+window.location.host;
							parent.postMessage(obj,targetOrigin);
							
						}
					})(item);
				}
			}
		}
		
	},
	
	/**
	* embed a comment by building the sg-annotations div (if necessary) and building an sg-annotation div
	* @param  {Object}      element to check the parent node of
	* @param  {String}      the title of the comment
	* @param  {String}      the comment HTML
	*/
	embedComments: function (el,title,comment) {
		
		// build the annotation div and add the content to it
		var annotationDiv = document.createElement("div");
		annotationDiv.classList.add("sg-annotation");
		
		var h3       = document.createElement("h3");
		var p        = document.createElement("p");
		h3.innerHTML = title;
		p.innerHTML  = comment;
		
		annotationDiv.appendChild(h3);
		annotationDiv.appendChild(p);
		
		// find the parent element to attach things to
		var parentEl = annotationsPattern.findParent(el);
		
		// see if a child with the class annotations exists
		var els = parentEl.getElementsByClassName("sg-annotations");
		if (els.length > 0) {
			els[0].appendChild(annotationDiv);
		} else {
			var annotationsDiv = document.createElement("div");
			annotationsDiv.classList.add("sg-annotations");
			annotationsDiv.appendChild(annotationDiv);
			parentEl.appendChild(annotationsDiv);
		}
		
	},
	
	/**
	* recursively find the parent of an element to see if it contains the sg-pattern class
	* @param  {Object}      element to check the parent node of
	*/
	findParent: function(el) {
		
		if (el.parentNode.classList.contains("sg-pattern")) {
			return el.parentNode;
		} else {
			var parentEl = annotationsPattern.findParent(el.parentNode);
		}
		
		return parentEl;
		
	},
	
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
		
		if (event.data.commentToggle != undefined) {
			
			// if this is an overlay make sure it's active for the onclick event
			annotationsPattern.commentsOverlayActive  = false;
			annotationsPattern.commentsEmbeddedActive = false;
			
			// see which flag to toggle based on if this is a styleguide or view-all page
			var body = document.getElementsByTagName("body");
			if ((event.data.commentToggle == "on") && (body[0].classList.contains("sg-pattern-list"))) {
				annotationsPattern.commentsEmbeddedActive = true;
			} else if (event.data.commentToggle == "on") {
				annotationsPattern.commentsOverlayActive  = true;
			}
			
			// if comments overlay is turned off make sure to remove the has-comment class and pointer
			if (!annotationsPattern.commentsOverlayActive) {
				var els = document.querySelectorAll(".has-comment");
				for (var i = 0; i < els.length; i++) {
					els[i].classList.remove("has-comment");
				}
			}
			
			// if comments embedding is turned off make sure to hide the annotations div
			if (!annotationsPattern.commentsEmbeddedActive) {
				var els = document.getElementsByClassName("sg-annotations");
				for (var i = 0; i < els.length; i++) {
					els[i].style.display = "none";
				}
			}
			
			// if comments overlay is turned on add the has-comment class and pointer
			if (annotationsPattern.commentsOverlayActive) {
				
				for (comment in comments.comments) {
					var item = comments.comments[comment];
					var els  = document.querySelectorAll(item.el);
					for (var i = 0; i < els.length; i++) {
						els[i].classList.add("has-comment");
					}
				}
				
			} else if (annotationsPattern.commentsEmbeddedActive && !annotationsPattern.commentsEmbedded) {
				
				// if comment embedding is turned on and comments haven't been embedded yet do it
				for (comment in comments.comments) {
					var item = comments.comments[comment];
					var els  = document.querySelectorAll(item.el);
					if (els.length > 0) {
						annotationsPattern.embedComments(els[0],item.title,item.comment);
					}
					annotationsPattern.commentsEmbedded = true;
				}
				
			} else if (annotationsPattern.commentsEmbeddedActive && annotationsPattern.commentsEmbedded) {
				
				// if comment embedding is turned on and comments have been embedded simply display them
				var els = document.getElementsByClassName("sg-annotations");
				for (var i = 0; i < els.length; ++i) {
					els[i].style.display = "block";
				}
				
			}
			
		}
		
	}
	
};

// add the onclick handlers to the elements that have an annotations
annotationsPattern.showComments();
window.addEventListener("message", annotationsPattern.receiveIframeMessage, false);

// before unloading the iframe make sure any active overlay is turned off/closed
window.onbeforeunload = function() {
	var obj = { "commentOverlay": "off" };
	var targetOrigin = (window.location.protocol == "file:") ? "*" : window.location.protocol+"//"+window.location.host;
	parent.postMessage(obj,targetOrigin);
};