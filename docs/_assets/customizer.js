function init() {
  'use strict';

  new MaterialCustomizer(document.getElementById('mdl-gen-body'));
}

function MaterialCustomizer(page) {
  'use strict';

  this.page = page;
  this.colors = null;
  this.selectedPrimary = null;
  this.selectedAccent = null;
  this.selectingPrimary = true;
  this.blob = null;

  this.init();
}

MaterialCustomizer.prototype.init = function() {
  'use strict';

  if (!this.page.getAttribute('initialized')) {
    this.changeColor();

    this.colors = this.page.querySelectorAll('.mdl-gen-color');

    for (var i = 0; i < this.colors.length; i++) {
      this.colors[i].addEventListener('click', this.selectColor.bind(this));

      if (this.colors[i].classList.contains('is-primary')) {
        this.selectedPrimary = i;
      }

      if (this.colors[i].classList.contains('is-accent')) {
        this.selectedAccent = i;
      }
    }

    document.getElementById('download').addEventListener('click',
        this.download.bind(this));

    var isSafari = /constructor/i.test(window.HTMLElement);
    if (isSafari) {
      document.getElementById('download').innerHTML = 'Get CSS';
    } else {
      document.getElementById('warning').classList.add('mdl-gen--hidden');
    }

    this.page.setAttribute('initialized', true);
  }
};

MaterialCustomizer.prototype.processTemplate = function(response) {
  'use strict';

  var palettes = [
    ['255,235,238', '255,205,210', '239,154,154', '229,115,115', '239,83,80',
     '244,67,54', '229,57,53', '211,47,47', '198,40,40', '183,28,28',
     '255,138,128', '255,82,82', '255,23,68', '213,0,0'],
    ['252,228,236', '248,187,208', '244,143,177', '240,98,146', '236,64,122',
     '233,30,99', '216,27,96', '194,24,91', '173,20,87', '136,14,79',
     '255,128,171', '255,64,129', '245,0,87', '197,17,98'],
    ['243,229,245', '225,190,231', '206,147,216', '186,104,200', '171,71,188',
     '156,39,176', '142,36,170', '123,31,162', '106,27,154', '74,20,140',
     '234,128,252', '224,64,251', '213,0,249', '170,0,255'],
    ['237,231,246', '209,196,233', '179,157,219', '149,117,205', '126,87,194',
     '103,58,183', '94,53,177', '81,45,168', '69,39,160', '49,27,146',
     '179,136,255', '124,77,255', '101,31,255', '98,0,234'],
    ['232,234,246', '197,202,233', '159,168,218', '121,134,203', '92,107,192',
     '63,81,181', '57,73,171', '48,63,159', '40,53,147', '26,35,126',
     '140,158,255', '83,109,254', '61,90,254', '48,79,254'],
    ['227,242,253', '187,222,251', '144,202,249', '100,181,246', '66,165,245',
     '33,150,243', '30,136,229', '25,118,210', '21,101,192', '13,71,161',
     '130,177,255', '68,138,255', '41,121,255', '41,98,255'],
    ['225,245,254', '179,229,252', '129,212,250', '79,195,247', '41,182,246',
     '3,169,244', '3,155,229', '2,136,209', '2,119,189', '1,87,155',
     '128,216,255', '64,196,255', '0,176,255', '0,145,234'],
    ['224,247,250', '178,235,242', '128,222,234', '77,208,225', '38,198,218',
     '0,188,212', '0,172,193', '0,151,167', '0,131,143', '0,96,100',
     '132,255,255', '24,255,255', '0,229,255', '0,184,212'],
    ['224,242,241', '178,223,219', '128,203,196', '77,182,172', '38,166,154',
     '0,150,136', '0,137,123', '0,121,107', '0,105,92', '0,77,64',
     '167,255,235', '100,255,218', '29,233,182', '0,191,165'],
    ['232,245,233', '200,230,201', '165,214,167', '129,199,132', '102,187,106',
     '76,175,80', '67,160,71', '56,142,60', '46,125,50', '27,94,32',
     '185,246,202', '105,240,174', '0,230,118', '0,200,83'],
    ['241,248,233', '220,237,200', '197,225,165', '174,213,129', '156,204,101',
     '139,195,74', '124,179,66', '104,159,56', '85,139,47', '51,105,30',
     '204,255,144', '178,255,89', '118,255,3', '100,221,23'],
    ['249,251,231', '240,244,195', '230,238,156', '220,231,117', '212,225,87',
     '205,220,57', '192,202,51', '175,180,43', '158,157,36', '130,119,23',
     '244,255,129', '238,255,65', '198,255,0', '174,234,0'],
    ['255,253,231', '255,249,196', '255,245,157', '255,241,118', '255,238,88',
     '255,235,59', '253,216,53', '251,192,45', '249,168,37', '245,127,23',
     '255,255,141', '255,255,0', '255,234,0', '255,214,0'],
    ['255,248,225', '255,236,179', '255,224,130', '255,213,79', '255,202,40',
     '255,193,7', '255,179,0', '255,160,0', '255,143,0', '255,111,0',
     '255,229,127', '255,215,64', '255,196,0', '255,171,0'],
    ['255,243,224', '255,224,178', '255,204,128', '255,183,77', '255,167,38',
     '255,152,0', '251,140,0', '245,124,0', '239,108,0', '230,81,0',
     '255,209,128', '255,171,64', '255,145,0', '255,109,0'],
    ['251,233,231', '255,204,188', '255,171,145', '255,138,101', '255,112,67',
     '255,87,34', '244,81,30', '230,74,25', '216,67,21', '191,54,12',
     '255,158,128', '255,110,64', '255,61,0', '221,44,0'],
    ['239,235,233', '215,204,200', '188,170,164', '161,136,127', '141,110,99',
     '121,85,72', '109,76,65', '93,64,55', '78,52,46', '62,39,35'],
    ['250,250,250', '245,245,245', '238,238,238', '224,224,224', '189,189,189',
     '158,158,158', '117,117,117', '97,97,97', '66,66,66', '33,33,33'],
    ['236,239,241', '207,216,220', '176,190,197', '144,164,174', '120,144,156',
     '96,125,139', '84,110,122', '69,90,100', '55,71,79', '38,50,56']
  ];

  var generated = response;

  var primary = palettes[this.selectedPrimary][5];
  var primaryDark = palettes[this.selectedPrimary][7];
  var accent = palettes[this.selectedAccent][11];

  generated = this.replaceKeyword(
      generated, '\\$color-primary-dark', primaryDark);

  generated = this.replaceKeyword(
      generated, '\\$color-primary-contrast', this.calculateTextColor(primary));

  generated = this.replaceKeyword(
      generated, '\\$color-accent-contrast', this.calculateTextColor(accent));

  generated = this.replaceKeyword(generated, '\\$color-primary', primary);

  generated = this.replaceKeyword(generated, '\\$color-accent', accent);

  window.generated = generated;
  return generated;
};

MaterialCustomizer.prototype.calculateChannel = function(component) {
  'use strict';

  component = component / 255;

  return component < 0.03928 ?
      component / 12.92 : Math.pow((component + 0.055) / 1.055, 2.4);
};

MaterialCustomizer.prototype.calculateLuminance = function(color) {
  'use strict';

  var components = color.split(',');
  var red = this.calculateChannel(parseInt(components[0]));
  var green = this.calculateChannel(parseInt(components[1]));
  var blue = this.calculateChannel(parseInt(components[2]));

  return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
};

MaterialCustomizer.prototype.calculateContrast =
    function(background, foreground) {
  'use strict';

  var backLum = this.calculateLuminance(background) + 0.05;
  var foreLum = this.calculateLuminance(foreground) + 0.05;

  return Math.max(backLum, foreLum) / Math.min(backLum, foreLum);
};

MaterialCustomizer.prototype.calculateTextColor = function(background) {
  'use strict';

  var minimumContrast = 3.1;
  var light = '255,255,255';
  var dark = '66,66,66';

  // Most colors will be dark, so check light text color first.
  var whiteContrast = this.calculateContrast(background, light);

  if (whiteContrast >= minimumContrast) {
    return light;
  } else {
    var blackContrast = this.calculateContrast(background, dark);
    return blackContrast > whiteContrast ? dark : light;
  }
};

MaterialCustomizer.prototype.replaceKeyword = function(str, key, val) {
  'use strict';

  return str.replace(new RegExp(key, 'g'), val);
};

MaterialCustomizer.prototype.changeColor = function() {
  'use strict';

  var oldStyle = document.getElementById('main-stylesheet');

  var req = new XMLHttpRequest();
  var self = this;
  req.onload = function() {
    var style = document.createElement('style');
    style.id = 'main-stylesheet';
    style.textContent = self.processTemplate(this.responseText);
    if (oldStyle && oldStyle.parentNode) {
      oldStyle.parentNode.removeChild(oldStyle);
    }
    document.head.appendChild(style);
    self.prepareDownload();
  };
  req.open('get', '/material.min.css.template', true);
  req.send();
};

MaterialCustomizer.prototype.download = function() {
  'use strict';

  // Workaround for IE.
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(this.blob, 'material.min.css');
  }
};

MaterialCustomizer.prototype.prepareDownload = function() {
  'use strict';

  var link = document.getElementById('download');
  var blob = new Blob([window.generated], {type: 'text/css'});
  this.blob = blob;
  var url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'material.min.css');
};

MaterialCustomizer.prototype.selectColor = function(event) {
  'use strict';

  var index = event.target.getAttribute('index');

  if (!this.selectingPrimary && this.selectedPrimary === index) {
    this.colors[this.selectedPrimary].classList.remove('is-primary');
    this.colors[this.selectedAccent].classList.remove('is-accent');
    this.selectingPrimary = true;
    this.page.classList.add('mdl-gen--selecting-primary');
    this.page.classList.remove('mdl-gen--selecting-accent');
  } else if (this.selectingPrimary) {
    this.page.classList.remove('mdl-gen--selecting-primary');
    this.colors[this.selectedPrimary].classList.remove('is-primary');
    this.selectedPrimary = index;
    this.colors[index].classList.add('is-primary');
    this.selectingPrimary = false;
    this.page.classList.add('mdl-gen--selecting-accent');
  } else {
    this.page.classList.remove('mdl-gen--selecting-primary');
    this.colors[this.selectedAccent].classList.remove('is-accent');
    this.selectedAccent = index;
    this.colors[index].classList.add('is-accent');
    this.selectingPrimary = true;
    this.page.classList.remove('mdl-gen--selecting-accent');
  }

  this.changeColor();
};
