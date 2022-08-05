/**
 * Create Ripple effect
 * 
 * @link https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
 * 
 * @param {Event} event 
 */
// export function createRipple(event: MouseEvent) {
//   const item = event.currentTarget as HTMLElement;

//   const circle = document.createElement("span");
//   const diameter = Math.max(item.clientWidth, item.clientHeight);
//   const radius = diameter / 2;

//   circle.style.width = circle.style.height = `${diameter}px`;
//   circle.style.left = `${event.clientX - item.offsetLeft - radius}px`;
//   circle.style.top = `${event.clientY - item.offsetTop - radius}px`;
//   circle.classList.add("ripple-effect");

//   const ripple = item.getElementsByClassName("ripple-effect")[0];

//   if (ripple) {
//     ripple.remove();
//   }

//   item.appendChild(circle);
// }

// const ripples = document.querySelectorAll(".ripple, .button");
// for (const item of ripples) {
//   item.addEventListener("mousedown", createRipple);
// }
