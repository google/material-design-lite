import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";

export const tagName = "color-box";

@customElement(tagName)
export class ColorBox extends LitElement {
    static styles = css`
    .box {
      padding: 0.5rem;
      min-height: 3rem;
      border: 1px solid var(--md-sys-color-outline-variant);
      border-radius: var(--border-radius);
      border-top-left-radius: var(--top-left-radius);
      border-top-right-radius: var(--top-right-radius);
      border-bottom-left-radius: var(--bottom-left-radius);
      border-bottom-right-radius: var(--bottom-right-radius);
      padding-left: var(--padding-left, 0.5rem);
      padding-right: var(--padding-right, 0.5rem);
      box-shadow: var(--box-shadow);
    }
  `;

    @property() name = "";
    @property() background = "";
    @property() foreground = "";

    render() {
        const styles = {
            backgroundColor: this.background.startsWith("--")
                ? `var(${this.background})`
                : this.background,
            color: this.foreground.startsWith("--")
                ? `var(${this.foreground})`
                : this.foreground,
        };
        return html`
          <link
            rel="stylesheet"
            href="https://rodydavis.github.io/material-design-lite/css/components/tooltip/style.css"
        />
        <div class="box tooltip" 
        style=${styleMap(styles)}
        data-tooltip=${this.background}
        >${this.name}</div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ColorBox;
    }
}
