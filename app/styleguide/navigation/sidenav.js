'use strict';

(function() {
  /**
   * SideNav Prototype Start
   */
  function SideNav(sidenavElement) {
    this.STATE_OPEN = 0;
    this.STATE_CLOSE = 1;

    var currentState = null;

    sidenavElement.addEventListener('transitionend', function() {
      sidenavElement.classList.remove('animatable');
    });

    this.changeState = function(newState) {
      switch (newState) {
        case this.STATE_OPEN:
          sidenavElement.classList.add('animatable');
          sidenavElement.classList.add('visible');
          this.sendEvent('onSideNavOpen');
          break;
        case this.STATE_CLOSE:
          sidenavElement.classList.add('animatable');
          sidenavElement.classList.remove('visible');
          this.sendEvent('onSideNavClose');
          break;
      }

      currentState = newState;
    };

    this.isOpen = function() {
      return currentState === this.STATE_OPEN;
    };

    this.sendEvent = function(evtName, data) {
      var evt = document.createEvent('Event');
      evt.initEvent(evtName, true, true);
      if (!!data) {
        evt.data = data;
      }
      sidenavElement.dispatchEvent(evt);
    };

    this.addEventListener = function(eventName, cb) {
      sidenavElement.addEventListener(eventName, cb);
    };
  }

  SideNav.prototype.open = function() {
    this.changeState(this.STATE_OPEN);
  };

  SideNav.prototype.close = function() {
    this.changeState(this.STATE_CLOSE);
  };

  SideNav.prototype.toggle = function() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };
  /**
   * SideNav Prototype End
   */

  window.addEventListener('load', function() {
    var modalBg = document.querySelector('.sidenav-modal-bg');
    var menuButton = document.querySelector('.nav-button');
    var sidenavs = document.querySelectorAll('.sidenav');
    var sidenav = new SideNav(sidenavs[0]);

    sidenav.addEventListener('onSideNavOpen', function() {
      if (!modalBg) {
        // No modal dialog - nothing to do
        return;
      }

      modalBg.classList.add('animatable');
      modalBg.classList.add('visible');
    });

    sidenav.addEventListener('onSideNavClose', function() {
      if (!modalBg) {
        // No modal dialog - nothing to do
        return;
      }

      modalBg.classList.add('animatable');
      modalBg.classList.remove('visible');
    });

    modalBg.addEventListener('transitionend', function() {
      modalBg.classList.remove('animatable');
    });

    modalBg.addEventListener('click', function(evt) {
      sidenav.close();
    });

    menuButton.addEventListener('click', function(evt) {
      sidenav.toggle();
    });
  });
})();
