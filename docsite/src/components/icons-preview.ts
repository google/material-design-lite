import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export const tagName = "icons-preview";

@customElement(tagName)
export class IconsPreview extends LitElement {
    static styles = css`
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1rem;
      padding: 1rem;
      align-items: center;
      text-align: center;
    }
    i {
      font-style: normal;
      font-size: 2rem;
    }
  `;

    @property() variant = "material-icons";

    private materialIcons = [
        "3d_rotation",
        "ac_unit",
        "access_alarm",
        "access_alarms",
        "access_time",
        "accessibility",
        "accessibility_new",
        "accessible",
        "accessible_forward",
        "account_balance",
        "account_balance_wallet",
        "account_box",
        "account_circle",
        "adb",
        "add",
        "add_a_photo",
        "add_alarm",
        "add_alert",
        "add_box",
        "add_circle",
        "add_circle_outline",
        "add_location",
        "add_photo_alternate",
        "add_shopping_cart",
    ];

    render() {
        return html`
      <link
        rel="stylesheet"
        href="https://rodydavis.github.io/material-design-lite/css/icons.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div class="icon-grid">
        ${this.materialIcons.map(
            (icon) => html`<div class="icon">
            <i class=${this.variant}>${icon}</i>
          </div>`
        )}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        [tagName]: IconsPreview;
    }
}
