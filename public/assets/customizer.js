/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global MaterialCustomizer:true,Prism:true,ga:true*/

/* exported init */
function init() {
  'use strict';

  var wheel = document.querySelector('#wheel > svg');
  var cdn = document.querySelector('.mdl-gen__cdn .mdl-gen__cdn-link');
  var mc = new MaterialCustomizer(wheel, cdn);

  // Workaround for IE.
  var dl = document.querySelector('#download');
  dl.addEventListener('click', function() {
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(this.blob, 'material.min.css');
    }
  }.bind(mc));

  // Hook up GA event
  dl.addEventListener('click', function() {
    ga('send', {
      hitType: 'event',
      eventCategory: 'customizer',
      eventAction: 'download',
      eventLabel: mc.getSelectedPrimary() + '-' + mc.getSelectedSecondary()
    });
  });

  var clickCtr = 0;
  cdn.addEventListener('click', function() {
    var selection = window.getSelection();
    selection.removeAllRanges();

    var range = document.createRange();
    if (clickCtr === 0) {
      var link = cdn.querySelectorAll('.token.attr-value')[1];
      range.setStart(link, 2);
      range.setEnd(link, 3);
    } else {
      range.setStart(cdn, 1);
      range.setEnd(cdn, 2);
    }

    selection.addRange(range);
    clickCtr = (clickCtr + 1) % 2;
  });

  // Prevent browser's selection handling
  cdn.addEventListener('mouseup', function(ev) {
    ev.preventDefault();
  });
  cdn.addEventListener('mousedown', function(ev) {
    ev.preventDefault();
  });

  document.addEventListener('mouseup', function() {
    if (window.getSelection().toString().indexOf('.min.css') !== -1) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'customizer',
        eventAction: 'copy',
        eventLabel: mc.getSelectedPrimary() + '-' + mc.getSelectedSecondary()
      });
    }
  });

  // Download template
  var req = new XMLHttpRequest();
  req.onload = function() {
    mc.template = this.responseText;
    mc.highlightField('Indigo');
    mc.highlightField('Pink');
    window.requestAnimationFrame(function() {
      mc.updateCDN();
      mc.updateStylesheet();
    });
  };
  req.open('get', '../material.min.css.template', true);
  req.send();
}

MaterialCustomizer = (function() {
  'use strict';

  var COLORS = ['Cyan', 'Teal', 'Green', 'Light Green', 'Lime',
                        'Yellow', 'Amber', 'Orange', 'Brown', 'Blue Grey',
                        'Grey', 'Deep Orange', 'Red', 'Pink', 'Purple',
                        'Deep Purple', 'Indigo', 'Blue', 'Light Blue'];
  var FORBIDDEN_ACCENTS = ['Blue Grey', 'Brown', 'Grey'];
  var MD_COLORS = ['Red', 'Pink', 'Purple', 'Deep Purple', 'Indigo',
                'Blue', 'Light Blue', 'Cyan', 'Teal', 'Green',
                'Light Green', 'Lime', 'Yellow', 'Amber', 'Orange',
                'Deep Orange', 'Brown', 'Grey', 'Blue Grey'];
  var MD_SHADES = ['50', '100', '200', '300', '400',
                '500', '600', '700', '800', '900',
                'A100', 'A200', 'A400', 'A700'];
  var MD_PALETTE =  [
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

  function parentWrapper(p) {
    return p.parentElement || p.parentNode;
  }

  var MaterialCustomizer = function(wheel, cdn) {
    this.wheel = wheel;
    this.cdn = cdn;
    if (this.cdn) {
      this.cdnTpl = cdn.textContent;
    }
    this.paletteIndices = MD_COLORS;
    this.lightnessIndices = MD_SHADES;
    this.palettes = MD_PALETTE;

    this.init_();
  };

  MaterialCustomizer.prototype.init_ = function() {
    this.config = {
      width: 650, // width of the SVG panel
      height: 650, // height of the SVG panel
      r: 250, // radius of the wheel
      ri: 100, // radius of the inner hole
      hd: 40, // height of the dark section
      c: 40, // Distance(center of selector circle, border of wheel)
      mrs: 0.5, // Percent of available width to use as radius for selector circle
      alphaIncr: 0.005, // Value to add to alpha to make tiles overlap slightly
      colors: COLORS
    };
    this.forbiddenAccents = FORBIDDEN_ACCENTS;
    this.calculateValues_();

    if (this.wheel) {
      this.buildWheel_();
    }

    return;
  };

  MaterialCustomizer.prototype.calculateValues_ = function() {
    var config = this.config;
    // Calculated values
    // Angle of each piece of the wheel
    config.alphaDeg = 360.0 / config.colors.length;
    config.alphaRad = config.alphaDeg * Math.PI / 180;
    // Radius of selector circle
    config.rs = (config.c + config.r) * Math.sin(config.alphaRad / 2);
    config.rs *= config.mrs;
    // Angle of selector cone
    config.selectorAlphaRad = Math.atan(config.rs / config.c) * 2;
    // Angles of cone tangetial point
    config.gamma1 = config.alphaRad / 2 - config.selectorAlphaRad / 2;
    config.gamma2 = config.alphaRad / 2 + config.selectorAlphaRad / 2;
    // Center of selector circle
    config.cx = (config.c + config.r) * Math.sin(config.alphaRad) / 2;
    config.cy = -(config.c + config.r) * (1 + Math.cos(config.alphaRad)) / 2;

    this.config = config;
  };

  MaterialCustomizer.prototype.buildWheel_ = function() {
    var config = this.config;
    var mainG = this.wheel.querySelector('g.wheel--maing');
    var wheelContainer = this.wheel.parentNode;

    this.wheel.setAttribute('viewBox', '0 0 ' +
      this.config.width + ' ' +  this.config.height);
    this.wheel.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    this.wheel.setAttribute('width', this.config.width);
    this.wheel.setAttribute('height', this.config.height);

    var fieldTpl = this.generateFieldTemplate_();

    var svgNS = 'http://www.w3.org/2000/svg';
    config.colors.forEach(function(color, idx) {
      var field = fieldTpl.cloneNode(true);
      var tooltip = document.createElement('div');

      for (var i = 1; i <= 2; i++) {
        var g = document.createElementNS(svgNS, 'g');
        var label = document.createElementNS(svgNS, 'text');
        label.setAttribute('class', 'label label--' + i);
        label.setAttribute('transform',
          'rotate(' + (-config.alphaDeg * idx) + ')');
        label.setAttribute('dy', '0.5ex');
        label.textContent = '' + i;
        g.appendChild(label);
        g.setAttribute('transform',
          'translate(' + config.cx + ',' + config.cy + ')');
        field.appendChild(g);
      }
      field.setAttribute('data-color', color);
      field.id = color;
      field.querySelector('.polygons > *:nth-child(1)').style.fill =
        'rgb(' + this.getColor(color, '500') + ')';
      field.querySelector('.polygons > *:nth-child(2)').style.fill =
        'rgb(' + this.getColor(color, '700') + ')';
      field.querySelector('.polygons').
        addEventListener('click', this.fieldClicked_.bind(this));
      field.setAttribute('transform', 'rotate(' + config.alphaDeg * idx + ')');
      mainG.appendChild(field);

      tooltip.setAttribute('for', color);
      tooltip.className = 'mdl-tooltip mdl-tooltip--large';
      tooltip.innerHTML = color;
      wheelContainer.appendChild(tooltip);
    }.bind(this));

    mainG.setAttribute('transform',
      'translate(' + config.width / 2 + ',' + config.height / 2 + ')');

  };

  MaterialCustomizer.prototype.generateFieldTemplate_ = function() {
    var svgNS = 'http://www.w3.org/2000/svg';
    var config = this.config;
    var fieldTpl = document.createElementNS(svgNS, 'g');
    var polygons = document.createElementNS(svgNS, 'g');
    var lightField = document.createElementNS(svgNS, 'polygon');
    lightField.setAttribute('points', [
      [
        config.ri * Math.sin(config.alphaRad + config.alphaIncr),
        -config.ri * Math.cos(config.alphaRad + config.alphaIncr)
      ].join(','),
      [
        config.r * Math.sin(config.alphaRad + config.alphaIncr),
        -config.r * Math.cos(config.alphaRad + config.alphaIncr)
      ].join(','),
      [0, -config.r].join(','),
      [0, -(config.ri + config.hd)].join(','),
    ].join(' '));
    var darkField = document.createElementNS(svgNS, 'polygon');
    darkField.setAttribute('points', [
      [
        config.ri * Math.sin(config.alphaRad + config.alphaIncr),
        -config.ri * Math.cos(config.alphaRad + config.alphaIncr)
      ].join(','),
      [
        (config.ri + config.hd) * Math.sin(config.alphaRad + config.alphaIncr),
        -(config.ri + config.hd) * Math.cos(config.alphaRad + config.alphaIncr)
      ].join(','),
      [0, -(config.ri + config.hd)].join(','),
      [0, -config.ri].join(','),
    ].join(' '));
    polygons.appendChild(lightField);
    polygons.appendChild(darkField);
    polygons.setAttribute('class', 'polygons');
    fieldTpl.appendChild(polygons);

    var selector = document.createElementNS(svgNS, 'path');
    selector.setAttribute('class', 'selector');
    selector.setAttribute('d',
      ' M ' +
      (config.r   * Math.sin(config.alphaRad) / 2) +
      ' ' +
      -(config.r * (1 + Math.cos(config.alphaRad)) / 2) +
      ' L ' +
      (config.cx - config.rs * Math.cos(config.gamma1)) +
      ' ' +
      (config.cy - config.rs * Math.sin(config.gamma1)) +
      ' A ' +
      config.rs +
      ' ' +
      config.rs +
      ' ' +
      config.alphaDeg +
      ' 1 1 ' +
      (config.cx + config.rs * Math.cos(config.gamma2)) +
      ' ' +
      (config.cy + config.rs * Math.sin(config.gamma2)) +
      ' z '
    );
    fieldTpl.appendChild(selector);

    return fieldTpl;
  };

  MaterialCustomizer.prototype.getNumSelected = function() {
    if (this.wheel.querySelector('.selected--2')) {
      return 2;
    } else if (this.wheel.querySelector('.selected--1')) {
      return 1;
    }
    return 0;
  };

  MaterialCustomizer.prototype.fieldClicked_ = function (ev) {
    var g = parentWrapper(parentWrapper(ev.target));
    var selectedColor = g.getAttribute('data-color');
    var numSelected = this.getNumSelected();
    // Ignore clicks on already selected fields
    if ((g.getAttribute('class') || '').indexOf('selected--1') !== -1 && numSelected === 1) {
      return;
    }

    switch (numSelected) {
      case 1:
        if (this.forbiddenAccents.indexOf(selectedColor) !== -1) {
          return;
        }
        this.highlightField(g.getAttribute('data-color'));
        this.wheel.setAttribute('class', '');
        window.requestAnimationFrame(function() {
          this.updateCDN();
          this.updateStylesheet();
        }.bind(this));
        break;
      case 2:
        Array.prototype.forEach.call(
          this.wheel.querySelector('g.wheel--maing').childNodes,
          function(f) {
            f.setAttribute('class', '');
            f.querySelector('.polygons').setAttribute('filter', '');
          }
        );
        /* falls through */
      case 0:
        this.highlightField(g.getAttribute('data-color'));
        window.requestAnimationFrame(function() {
          this.wheel.setAttribute('class', 'hide-nonaccents');
        }.bind(this));
        break;
    }
  };

  MaterialCustomizer.prototype.replaceDict = function(s, dict) {
    for (var key in dict) {
      s = s.replace(new RegExp(key, 'g'), dict[key]);
    }
    return s;
  };

  MaterialCustomizer.prototype.urlsafeName = function(s) {
    return s.toLowerCase().replace(' ', '_');
  };

  MaterialCustomizer.prototype.getSelectedPrimary = function() {
    return this.wheel.querySelector('.selected--1')
                     .getAttribute('data-color');
  };

  MaterialCustomizer.prototype.getSelectedSecondary = function() {
    return this.wheel.querySelector('.selected--2')
                     .getAttribute('data-color');
  };

  MaterialCustomizer.prototype.updateCDN = function() {
    var primaryColor = this.getSelectedPrimary();
    var secondaryColor = this.getSelectedSecondary();

    this.cdn.textContent = this.replaceDict(this.cdnTpl, {
      '\\$primary': this.urlsafeName(primaryColor),
      '\\$accent': this.urlsafeName(secondaryColor)
    });
    Prism.highlightElement(this.cdn);
  };

  MaterialCustomizer.prototype.highlightField = function(color) {
    var g = this.wheel.querySelector('[data-color="' + color + '"]');
    var parent = parentWrapper(g);

    // Make the current polygon the last child of its parent
    // so shadows are visible.
    parent.removeChild(g);
    parent.appendChild(g);

    // We changed the DOM hierarchy, CSS animations might not show until
    // DOM has updated internally.
    g.setAttribute('class', 'selected selected--' + (this.getNumSelected() + 1));

    var isIE = window.navigator.msPointerEnabled;
    // FIXME: Shadows in IE10 don't disappear, for now they are disabled
    if (!isIE) {
      g.querySelector('.polygons')
      .setAttribute('filter', 'url(#drop-shadow)');
    }
  };

  MaterialCustomizer.prototype.getColor = function(name, lightness) {
    var r = this.palettes[this.paletteIndices.indexOf(name)];
    if (!r) {
      return null;
    }
    return r[this.lightnessIndices.indexOf(lightness)];
  };

  MaterialCustomizer.prototype.processTemplate = function(primaryColor, secondaryColor) {
    var primary = this.getColor(primaryColor, '500');
    var primaryDark = this.getColor(primaryColor, '700');
    var accent = this.getColor(secondaryColor, 'A200');

    return this.replaceDict(this.template, {
      '\\$color-primary-dark': primaryDark,
      '\\$color-primary-contrast': this.calculateTextColor(primary),
      '\\$color-accent-contrast': this.calculateTextColor(accent),
      '\\$color-primary': primary,
      '\\$color-accent': accent
    });
  };

  MaterialCustomizer.prototype.calculateChannel = function(component) {
    component = component / 255;

    return component < 0.03928 ?
        component / 12.92 : Math.pow((component + 0.055) / 1.055, 2.4);
  };

  MaterialCustomizer.prototype.calculateLuminance = function(color) {
    var components = color.split(',');
    var red = this.calculateChannel(parseInt(components[0]));
    var green = this.calculateChannel(parseInt(components[1]));
    var blue = this.calculateChannel(parseInt(components[2]));

    return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
  };

  MaterialCustomizer.prototype.calculateContrast =
      function(background, foreground) {
    var backLum = this.calculateLuminance(background) + 0.05;
    var foreLum = this.calculateLuminance(foreground) + 0.05;

    return Math.max(backLum, foreLum) / Math.min(backLum, foreLum);
  };

  MaterialCustomizer.prototype.calculateTextColor = function(background) {
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
    return str.replace(new RegExp(key, 'g'), val);
  };

  MaterialCustomizer.prototype.updateStylesheet = function() {
    var oldStyle = document.getElementById('main-stylesheet');
    var newStyle = document.createElement('style');
    newStyle.id = 'main-stylesheet';

    var style = this.processTemplate(
      this.getSelectedPrimary(),
      this.getSelectedSecondary());
    if (oldStyle && oldStyle.parentNode) {
      oldStyle.parentNode.removeChild(oldStyle);
    }
    newStyle.textContent = style;
    document.head.appendChild(newStyle);
    this.prepareDownload(style);
  };

  MaterialCustomizer.prototype.prepareDownload = function(content) {
    var link = document.getElementById('download');
    var blob = new Blob([content], {type: 'text/css'});
    this.blob = blob;
    var url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'material.min.css');
  };

  return MaterialCustomizer;
})();

// For NodeJS usage
if (typeof module !== 'undefined') {
  module.exports = MaterialCustomizer;
}
