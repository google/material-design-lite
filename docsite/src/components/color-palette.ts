import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "./color-box.ts";

export const tagName = "color-palette";

@customElement(tagName)
export class ColorPalette extends LitElement {
    static styles = css`
    :host {
      --radius: 16px;
    }

    .row {
      display: flex;
      flex-direction: row;
    }

    color-box:first-child {
      --padding-left: 1rem;
    }

    color-box:last-child {
      --padding-right: 1rem;
    }

    .color-scheme .color-family:first-child color-box:first-child,
    :where(.surfaces, .tonal-palette) color-box:first-child {
      --top-left-radius: var(--radius);
    }

    .color-scheme .color-family:first-child color-box:last-child,
    :where(.surfaces, .tonal-palette) color-box:last-child {
      --top-right-radius: var(--radius);
    }

    .color-scheme .color-family:last-child color-box:first-child,
    :where(.surfaces, .tonal-palette) color-box:first-child {
      --bottom-left-radius: var(--radius);
    }

    .color-scheme .color-family:last-child color-box:last-child,
    :where(.surfaces, .tonal-palette) color-box:last-child {
      --bottom-right-radius: var(--radius);
    }

    color-box {
      flex: 1;
    }
  `;

    @property() group = "error";
    private values = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];

    render() {
        return html`<div class="row tonal-palette">
      ${repeat(
            this.values,
            (value) =>
                html`<color-box
            foreground=${value >= 60
                        ? "--md-ref-palette-black"
                        : "--md-ref-palette-white"}
            background=${`--md-ref-palette-${this.group}${value}`}
            name=${`${value}`}
            >0</color-box
          >`
        )}
    </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ColorPalette;
    }
}
