(function () {
    var navdrawerContainer = document.querySelector('.navdrawer-container');
    var appbarElement = document.querySelector('.app-bar');
    var menuBtn = document.querySelector('.menu');

    menuBtn.addEventListener('click', function () {
        var isOpen = navdrawerContainer.classList.contains('open');
        if (isOpen) {
            appbarElement.classList.remove('open');
            navdrawerContainer.classList.remove('open');
        } else {
            appbarElement.classList.add('open');
            navdrawerContainer.classList.add('open');
        }
    }, true);
})();