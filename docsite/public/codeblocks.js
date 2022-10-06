const highlights = document.querySelectorAll("pre");
highlights.forEach((div) => {
  div.querySelector("code").setAttribute("tabindex", "0");

  // Code copy button
  const copy = document.createElement("button");
  copy.classList.add("icon-button");
  copy.classList.add("code-copy");
  const icon = document.createElement("i");
  icon.classList.add("material-icons");
  icon.innerHTML = "content_copy";
  copy.appendChild(icon);
  copy.addEventListener("click", (e) => copyCodeToClipboard(copy, div));

  // Wrap in a div to make it easier to position the button.
  const wrapper = document.createElement("div");
  wrapper.classList.add("code");
  wrapper.appendChild(copy);
  wrapper.appendChild(div.cloneNode(true));
  div.parentNode.insertBefore(wrapper, div);
  div.remove();
});

async function copyCodeToClipboard(button, code) {
  const text = code.textContent;
  await navigator.clipboard.writeText(text);
  const icon = button.querySelector("i");
  icon.innerHTML = "check";
  const currentColor = icon.style.color;
  icon.style.color = "#b2ff59";
  setTimeout(() => {
    icon.innerHTML = "content_copy";
    icon.style.color = currentColor;
  }, 2000);
}
