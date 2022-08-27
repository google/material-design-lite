const header = document.querySelector(".top-app-bar");
window.addEventListener("scroll", (e) => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
