document.addEventListener('DOMContentLoaded', function() {
  /*** SEARCH BAR ***/
  var mobileSearchBar = document.getElementsByClassName('mobile-search')[0];
  var mobileSearchBarClose = mobileSearchBar.querySelector('.close');

  mobileSearchBarClose.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileSearchBar.classList.remove('active-mobile-view');
    document.body.classList.remove('active-search');
  }, false);

  mobileSearchBar.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.add('active-mobile-view');
    document.body.classList.add('active-search');
  }, false);
  /*** END SEARCH BAR ***/

  window.addEventListener('resize', function(e) {
    mobileSearchBar.classList.remove('active-mobile-view');
    document.body.classList.remove('active-search');
  });
});

/*TODO - REFACTOR BELOW HERE INTO SEPARATE COMPONENTS*/

document.addEventListener('DOMContentLoaded', function() {

  var dialogEls = [];
  closeDialogs = function(elException) {
    Array.prototype.forEach.call(dialogEls, function(el, i) {
      if (!!elException && elException !== el) {
        el.classList.remove('open');
        el.classList.remove('open-left');
      } else if (!!!elException && !!el) {
        el.classList.remove('open');
        el.classList.remove('open-left');
      }
    });
  }

  initializeEls = function(els) {
    if (!!els) {
      Array.prototype.forEach.call(els, function(el, i) {
        var elButton = el.querySelector('button');
        var elListDialog = el.querySelector('dialog');

        elButton.addEventListener('click', function(e) {
          e.stopPropagation();

          var valuesDialog = elListDialog.getBoundingClientRect();
          var valuesBody = document.body.getBoundingClientRect();

          if (valuesDialog.left + valuesDialog.width > valuesBody.width) {
            el.classList.remove('open');
            el.classList.toggle('open-left');
          } else {
            el.classList.remove('open-left');
            el.classList.toggle('open');
          }
          closeDialogs(el);
        }, false);
        dialogEls.push(el);
      });
    }
  }

  /*** OVERFLOW MENU LIST ***/
  var overflowMenuListArr = document.getElementsByTagName('overflow-menu-list');
  initializeEls(overflowMenuListArr);
  /*** END OVERFLOW MENU LIST ***/

  /*** OVERFLOW MENU ACTION ***/
  var overflowMenuAction = document.getElementsByTagName('overflow-menu-action');
  initializeEls(overflowMenuAction);
  /*** END OVERFLOW MENU ACTION ***/

  /*** APPS GRID ***/
  var appsGrid = document.getElementsByTagName('apps-grid');
  initializeEls(appsGrid);
  /*** END APPS GRID ***/

  /*** NOTIFICATIONS LIST ***/
  var notificationList = document.getElementsByTagName('notification-list');
  initializeEls(notificationList);
  /*** END NOTIFICATIONS LIST ***/

  /*** LEFT NAV ***/
  var leftNav = document.getElementsByTagName('left-nav')[0];
  var burgerButton = document.getElementsByClassName('hamburger-button')[0];
  var maskModal = document.getElementsByTagName('mask-modal')[0];

  dialogEls.push(leftNav);

  if (!!burgerButton) {
    burgerButton.addEventListener('click', function(e) {
      e.stopPropagation();
      closeDialogs(e.target);
      document.body.classList.add('activeLeftNav');
    }, false);
  }

  /*** END LEFT NAV ***/

  /*** SEARCH BAR ***/
  var searchBars = document.getElementsByTagName('search-bar');

  Array.prototype.forEach.call(searchBars, function(el, i) {
    el.addEventListener('click', function(e) {
      closeDialogs();
      document.body.classList.remove('activeLeftNav');
    }, false);
  });
  /*** END SEARCH BAR ***/

  /*** DEMO ***/
  document.body.addEventListener('click', function(e) {
    closeDialogs();
    // resetSearchBarValues();
    document.body.classList.remove('activeLeftNav');
  }, false);
  /*** END DEMO ***/
});
