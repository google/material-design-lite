/*!
 * URL Handler - v0.1
 *
 * Copyright (c) 2013 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Helps handle the initial iFrame source. Parses a string to see if it matches
 * an expected pattern in Pattern Lab. Supports Pattern Labs fuzzy pattern partial
 * matching style.
 *
 */

var urlHandler = {
	
	// set-up some default vars
	skipBack: false,
	targetOrigin: (window.location.protocol == "file:") ? "*" : window.location.protocol+"//"+window.location.host,
	
	/**
	* get the real file name for a given pattern name
	* @param  {String}       the shorthand partials syntax for a given pattern
	*
	* @return {String}       the real file path
	*/
	getFileName: function (name) {
		
		var baseDir     = "patterns";
		var fileName    = "";
		
		if (name == undefined) {
			return fileName;
		}
		
		if (name == "all") {
			return "styleguide/html/styleguide.html";
		}
		
		var paths = (name.indexOf("viewall-") != -1) ? viewAllPaths : patternPaths;
		nameClean = name.replace("viewall-","");
		
		// look at this as a regular pattern
		var bits        = this.getPatternInfo(nameClean, paths);
		var patternType = bits[0];
		var pattern     = bits[1];
		
		if ((paths[patternType] != undefined) && (paths[patternType][pattern] != undefined)) {
			
			fileName = paths[patternType][pattern];
			
		} else if (paths[patternType] != undefined) {
			
			for (patternMatchKey in paths[patternType]) {
				if (patternMatchKey.indexOf(pattern) != -1) {
					fileName = paths[patternType][patternMatchKey];
					break;
				}
			}
		
		}
		
		if (fileName == "") {
			return fileName;
		}
		
		var regex = /\//g;
		if ((name.indexOf("viewall-") != -1) && (fileName != "")) {
			fileName = baseDir+"/"+fileName.replace(regex,"-")+"/index.html";
		} else if (fileName != "") {
			fileName = baseDir+"/"+fileName.replace(regex,"-")+"/"+fileName.replace(regex,"-")+".html";
		}
		
		return fileName;
	},
	
	/**
	* break up a pattern into its parts, pattern type and pattern name
	* @param  {String}       the shorthand partials syntax for a given pattern
	* @param  {Object}       the paths to be compared
	*
	* @return {Array}        the pattern type and pattern name
	*/
	getPatternInfo: function (name, paths) {
		
		var patternBits = name.split("-");
		
		var i = 1;
		var c = patternBits.length;
		
		var patternType = patternBits[0];
		while ((paths[patternType] == undefined) && (i < c)) {
			patternType += "-"+patternBits[i];
			i++;
		}
		
		pattern = name.slice(patternType.length+1,name.length);
		
		return [patternType, pattern];
		
	},
	
	/**
	* search the request vars for a particular item
	*
	* @return {Object}       a search of the window.location.search vars
	*/
	getRequestVars: function() {
		
		// the following is taken from https://developer.mozilla.org/en-US/docs/Web/API/window.location
		var oGetVars = new (function (sSearch) {
		  if (sSearch.length > 1) {
		    for (var aItKey, nKeyId = 0, aCouples = sSearch.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
		      aItKey = aCouples[nKeyId].split("=");
		      this[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
		    }
		  }
		})(window.location.search);
		
		return oGetVars;
		
	},
	
	/**
	* push a pattern onto the current history based on a click
	* @param  {String}       the shorthand partials syntax for a given pattern
	* @param  {String}       the path given by the loaded iframe
	*/
	pushPattern: function (pattern, givenPath) {
		var data         = { "pattern": pattern };
		var fileName     = urlHandler.getFileName(pattern);
		var expectedPath = window.location.protocol+"//"+window.location.host+window.location.pathname.replace("public/index.html","public/")+fileName;
		if (givenPath != expectedPath) {
			// make sure to update the iframe because there was a click
			document.getElementById("sg-viewport").contentWindow.postMessage( { "path": fileName }, urlHandler.targetOrigin);
		} else {
			// add to the history
			var addressReplacement = (window.location.protocol == "file:") ? null : window.location.protocol+"//"+window.location.host+window.location.pathname.replace("index.html","")+"?p="+pattern;
			history.pushState(data, null, addressReplacement);
			document.getElementById("title").innerHTML = "Pattern Lab - "+pattern;
			document.getElementById("sg-raw").setAttribute("href",urlHandler.getFileName(pattern));
		}
	},
	
	/**
	* based on a click forward or backward modify the url and iframe source
	* @param  {Object}      event info like state and properties set in pushState()
	*/
	popPattern: function (e) {
		
		var state = e.state;
		
		if (state == null) {
			this.skipBack = false;
			return;
		} else if (state != null) {
			var patternName = state.pattern;
		} 
		
		var iFramePath = "";
		iFramePath = this.getFileName(patternName);
		if (iFramePath == "") {
			iFramePath = "styleguide/html/styleguide.html";
		}
		
		document.getElementById("sg-viewport").contentWindow.postMessage( { "path": iFramePath }, urlHandler.targetOrigin);
		document.getElementById("title").innerHTML = "Pattern Lab - "+patternName;
		document.getElementById("sg-raw").setAttribute("href",urlHandler.getFileName(patternName));
		
		if (wsnConnected) {
			wsn.send( '{"url": "'+iFramePath+'", "patternpartial": "'+patternName+'" }' );
		}
		
	}
	
}

/**
* handle the onpopstate event
*/
window.onpopstate = function (event) {
	urlHandler.skipBack = true;
	urlHandler.popPattern(event);
}