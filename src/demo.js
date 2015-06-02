'use strict';

function addPenButtons() {
  var codeList = document.getElementsByTagName('pre');

  for (var i = 0, len = codeList.length; i < len; i++) {
	var elem = codeList[i],
		HTML = '',
        CSS = '',
        JS = '';

    HTML = elem.innerText;
    var data = {
	  html               : HTML,
	  css                : CSS,
	  js                 : JS
          };
    var JSONstring =
      JSON.stringify(data)
      // Quotes will screw up the JSON
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

    var form =
      '<form name="pen-form" action="http://codepen.io/pen/define" method="POST" target="_blank">' +
        '<input type="hidden" name="data" value=\'' +
        JSONstring +
        '\'>' +
        '<input type="image" src="http://s.cdpn.io/3/cp-arrow-right.svg" class="codepen-mover-button" width="40" height="40" value="Create New Pen with Prefilled Data">' +
      '</form>';

    elem.innerHTML += form;
  }
}

addPenButtons();