/*global DocumentTouch */
(function (document) {
    'use strict';

    var toggleDocumentationMenu = function () {
        var navBtn = document.querySelector('.main-nav__btn');
        var navList = document.querySelector('.main-nav__list');
        var navIsOpenedClass = 'nav-is-opened';
        var navListIsOpened = false;

        navBtn.addEventListener('click', function (event) {
            event.preventDefault();

            if (!navListIsOpened) {
                addClass(navList, navIsOpenedClass);
                navListIsOpened = true;
            } else {
                removeClass(navList, navIsOpenedClass);
                navListIsOpened = false;
            }
        });
    };

    var toggleMainNav = function () {
        var documentationItem = document.querySelector('.main-nav__item--documentation');
        var documentationLink = document.querySelector('.main-nav__item--documentation > .main-nav__link');
        var documentationIsOpenedClass = 'subnav-is-opened';
        var documentationIsOpened = false;

        documentationLink.addEventListener('click', function (event) {
            event.preventDefault();

            if (!documentationIsOpened) {
                documentationIsOpened = true;
                addClass(documentationItem, documentationIsOpenedClass);
            } else {
                documentationIsOpened = false;
                removeClass(documentationItem, documentationIsOpenedClass);
            }
        });
    };

    var isTouch = function () {
        return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    };

    var addClass = function (element, className) {
        if (!element) {
            return;
        }

        element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
    };

    var removeClass = function (element, className) {
        if (!element) {
            return;
        }

        element.className = element.className.replace(className, '');
    };

    var html = document.querySelector('html');
    removeClass(html, 'no-js');
    addClass(html, 'js');

    if (isTouch()) {
        removeClass(html, 'no-touch');
        addClass(html, 'is-touch');
    }

    toggleDocumentationMenu();
    toggleMainNav();
})(document);
