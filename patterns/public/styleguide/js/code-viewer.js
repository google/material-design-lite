/*!
 * Code View Support for the Viewer - v0.1
 *
 * Copyright (c) 2013 Brad Frost, http://bradfrostweb.com & Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 */

var codeViewer = {
	
	codeActive:     false,
	sw:             document.documentElement.clientWidth,
	breakpoint:     650,
	
	onReady: function() {
		
		$('body').addClass('code-ready');
		$('#sg-t-code').click(function(e) {
			e.preventDefault();
			
			// make sure the annotations overlay is off
			$('#sg-t-annotations').removeClass('active');
			annotationsViewer.commentsActive = false;
			var targetOrigin = (window.location.protocol == "file:") ? "*" : window.location.protocol+"//"+window.location.host;
			document.getElementById('sg-viewport').contentWindow.postMessage({ "commentToggle": "off" },targetOrigin);
			annotationsViewer.slideComment(999);
			
			codeViewer.toggleCode();
			codeViewer.codeContainerInit();
			
		});
		
	},
	
	toggleCode: function() {
		
		var targetOrigin = (window.location.protocol == "file:") ? "*" : window.location.protocol+"//"+window.location.host;
		$('#sg-t-code').toggleClass('active');
		
		if (!codeViewer.codeActive) {
			
			codeViewer.codeActive = true;
			document.getElementById('sg-viewport').contentWindow.postMessage({ "codeToggle": "on" },targetOrigin);
			
		} else {
			
			codeViewer.codeActive = false;
			document.getElementById('sg-viewport').contentWindow.postMessage({ "codeToggle": "off" },targetOrigin);
			codeViewer.slideCode(999);
			
		}
		
	},
	
	codeContainerInit: function() {
		
		if (document.getElementById("sg-code-container") == undefined) {
			$('<div id="sg-code-container" style="display: none;"></div>').html('<a href="#" id="sg-code-close-btn">Close</a><div id="sg-code-lineage" style="display: none;"><h2>Lineage</h2><p>This pattern contains the following patterns: <span id="sg-code-lineage-fill"></span></p></div><div id="sg-code-html"><h2>HTML</h2><pre><code id="sg-code-html-fill" class="language-markup"></code></pre></div><div id="sg-code-css" class="with-css" style="display: none;"><h2>CSS</h2><pre><code id="sg-code-css-fill" class="language-css"></code></pre></div>').appendTo('body').css('bottom',-$(document).outerHeight());
		}
		
		if (codeViewer.sw < codeViewer.breakpoint) {
			$('#sg-code-container').hide();
		} else {
			$('#sg-code-container').show();
		}
		
		$('body').delegate('#sg-code-close-btn','click',function(e) {
			codeViewer.slideCode($('#sg-code-container').outerHeight());
			return false;
		});
		
	},
	
	slideCode: function(pos) {
		
		$('#sg-code-container').show();
		
		if (codeViewer.sw > codeViewer.breakpoint) {
			$('#sg-code-container').css('bottom',-pos);
		} else {
			var offset = $('#sg-code-container').offset().top;
			$('html,body').animate({scrollTop: offset}, 500);
		}
		
	},
	
	updateCode: function(lineage,html,css) {
			
			// draw lineage
			if (lineage.length != 0) {
				$("#sg-code-lineage").css("display","block");
				var i = 0;
				var lineageList = "";
				for (pattern in lineage) {
					lineageList += (i == 0) ? "" : ", ";
					lineageList += "<a href='"+lineage[pattern]["lineagePath"]+"' data-patternPartial='"+lineage[pattern]["lineagePattern"]+"'>"+lineage[pattern]["lineagePattern"]+"</a>";
					i++;
				}
				
				$("#sg-code-lineage-fill").html(lineageList);
				
				$('#sg-code-lineage-fill a').on("click", function(e){
					e.preventDefault();
					document.getElementById("sg-viewport").contentWindow.postMessage( { "path": urlHandler.getFileName($(this).attr("data-patternpartial")) }, urlHandler.targetOrigin);
				});
			}
			
			// draw html
			$("#sg-code-html-fill").text(html);
			Prism.highlightElement(document.getElementById("sg-code-html-fill"));
			
			// draw CSS
			if (css.indexOf("{{ patternCSS }}") == -1) {
				$("#sg-code-html").addClass("with-css");
				$("#sg-code-css").css("display","block");
				$("#sg-code-css-fill").text(css);
				Prism.highlightElement(document.getElementById("sg-code-css-fill"));
			}
			
			codeViewer.slideCode(0);
			
	},
	
	/**
	* toggle the comment pop-up based on a user clicking on the pattern
	* based on the great MDN docs at https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage
	* @param  {Object}      event info
	*/
	receiveIframeMessage: function(event) {
		
		// does the origin sending the message match the current host? if not dev/null the request
		if ((window.location.protocol != "file:") && (event.origin !== window.location.protocol+"//"+window.location.host)) {
			return;
		}
		
		if (event.data.codeOverlay != undefined) {
			if (event.data.codeOverlay == "on") {
				
				codeViewer.updateCode(event.data.lineage,event.data.html,event.data.css);
				
			} else {
				
				codeViewer.slideCode($('#sg-code-container').outerHeight());
				
			}
		}
		
	}
	
}

$(document).ready(function() { codeViewer.onReady(); });
window.addEventListener("message", codeViewer.receiveIframeMessage, false);

// make sure if a new pattern or view-all is loaded that comments are turned on as appropriate
$('#sg-viewport').load(function() {
	if (codeViewer.codeActive) {
		var targetOrigin = (window.location.protocol == "file:") ? "*" : window.location.protocol+"//"+window.location.host;
		document.getElementById('sg-viewport').contentWindow.postMessage({ "codeToggle": "on" },targetOrigin);
	}
});
