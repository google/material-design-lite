var menuButton = document.querySelector('button.sidenav-button');
var sidenav = document.querySelector('.sidenav-nav');
var modalBg = document.querySelector('.sidenav-modal-bg');

menuButton.addEventListener('click', function(evt) {
  sidenav.classList.add('visible');

  modalBg.classList.add('visible');
});

modalBg.addEventListener('click', function(evt) {
  sidenav.classList.remove('visible');

  modalBg.classList.remove('visible');
});
