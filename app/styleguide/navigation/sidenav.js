'use strict';

(function() {
  /**
   * SideNav Prototype Start
   */
  function SideNav(sidenavElement) {
    this.STATE_OPEN = 0;
    this.STATE_CLOSE = 1;

    var isAnimating = false;
    var currentState = null;

    this.changeState = function(newState) {
      if (isAnimating) {
        // If we are animating, wait until the animation is complete
        return;
      }

      switch (newState) {
        case this.STATE_OPEN:
          sidenavElement.classList.add('visible');
          this.sendEvent('onSideNavOpen');
          break;
        case this.STATE_CLOSE:
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
    var sidenavs = document.querySelectorAll('.sidenav-container');
    var sidenav = new SideNav(sidenavs[0]);

    sidenav.addEventListener('onSideNavOpen', function() {
      if (!modalBg) {
        // No modal dialog - nothing to do
        return;
      }

      modalBg.classList.add('visible');
    });

    sidenav.addEventListener('onSideNavClose', function() {
      if (!modalBg) {
        // No modal dialog - nothing to do
        return;
      }

      modalBg.classList.remove('visible');
    });

    modalBg.addEventListener('click', function(evt) {
      sidenav.close();
    });

    var menuButton = document.querySelector('button.sidenav-button');
    menuButton.addEventListener('click', function(evt) {
      sidenav.toggle();
    });
  });
})();
