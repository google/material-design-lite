import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./color-box.ts";

export const tagName = "color-scheme";

@customElement(tagName)
export class ColorScheme extends LitElement {
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

    @property({ type: String }) suffix = "";

    buildRoles() {
        return [
            [
                {
                    name: "Primary",
                    background: `--md-sys-color-primary${this.suffix}`,
                    foreground: `--md-sys-color-on-primary${this.suffix}`,
                },
                {
                    name: "On Primary",
                    background: `--md-sys-color-on-primary${this.suffix}`,
                    foreground: `--md-sys-color-primary${this.suffix}`,
                },
                {
                    name: "Primary Container",
                    background: `--md-sys-color-primary-container${this.suffix}`,
                    foreground: `--md-sys-color-on-primary-container${this.suffix}`,
                },
                {
                    name: "On Primary Container",
                    background: `--md-sys-color-on-primary-container${this.suffix}`,
                    foreground: `--md-sys-color-primary-container${this.suffix}`,
                },
            ],
            [
                {
                    name: "Secondary",
                    background: `--md-sys-color-secondary${this.suffix}`,
                    foreground: `--md-sys-color-on-secondary${this.suffix}`,
                },
                {
                    name: "On Secondary",
                    background: `--md-sys-color-on-secondary${this.suffix}`,
                    foreground: `--md-sys-color-secondary${this.suffix}`,
                },
                {
                    name: "Secondary Container",
                    background: `--md-sys-color-secondary-container${this.suffix}`,
                    foreground: `--md-sys-color-on-secondary-container${this.suffix}`,
                },
                {
                    name: "On Secondary Container",
                    background: `--md-sys-color-on-secondary-container${this.suffix}`,
                    foreground: `--md-sys-color-secondary-container${this.suffix}`,
                },
            ],
            [
                {
                    name: "Tertiary",
                    background: `--md-sys-color-tertiary${this.suffix}`,
                    foreground: `--md-sys-color-on-tertiary${this.suffix}`,
                },
                {
                    name: "On Tertiary",
                    background: `--md-sys-color-on-tertiary${this.suffix}`,
                    foreground: `--md-sys-color-tertiary${this.suffix}`,
                },
                {
                    name: "Tertiary Container",
                    background: `--md-sys-color-tertiary-container${this.suffix}`,
                    foreground: `--md-sys-color-on-tertiary-container${this.suffix}`,
                },
                {
                    name: "On Tertiary Container",
                    background: `--md-sys-color-on-tertiary-container${this.suffix}`,
                    foreground: `--md-sys-color-tertiary-container${this.suffix}`,
                },
            ],
            [
                {
                    name: "Error",
                    background: `--md-sys-color-error${this.suffix}`,
                    foreground: `--md-sys-color-on-error${this.suffix}`,
                },
                {
                    name: "On Error",
                    background: `--md-sys-color-on-error${this.suffix}`,
                    foreground: `--md-sys-color-error${this.suffix}`,
                },
                {
                    name: "Error Container",
                    background: `--md-sys-color-error-container${this.suffix}`,
                    foreground: `--md-sys-color-on-error-container${this.suffix}`,
                },
                {
                    name: "On Error Container",
                    background: `--md-sys-color-on-error-container${this.suffix}`,
                    foreground: `--md-sys-color-error-container${this.suffix}`,
                },
            ],
            [
                {
                    name: "Background",
                    background: `--md-sys-color-background${this.suffix}`,
                    foreground: `--md-sys-color-on-background${this.suffix}`,
                },
                {
                    name: "On Background",
                    background: `--md-sys-color-on-background${this.suffix}`,
                    foreground: `--md-sys-color-background${this.suffix}`,
                },
                {
                    name: "Surface",
                    background: `--md-sys-color-surface${this.suffix}`,
                    foreground: `--md-sys-color-on-surface${this.suffix}`,
                },
                {
                    name: "On Surface",
                    background: `--md-sys-color-on-surface${this.suffix}`,
                    foreground: `--md-sys-color-surface${this.suffix}`,
                },
            ],
            [
                {
                    name: "Surface Variant",
                    background: `--md-sys-color-surface-variant${this.suffix}`,
                    foreground: `--md-sys-color-on-surface-variant${this.suffix}`,
                },
                {
                    name: "On Surface Variant",
                    background: `--md-sys-color-on-surface-variant${this.suffix}`,
                    foreground: `--md-sys-color-surface-variant${this.suffix}`,
                },
                {
                    name: "Inverse Surface",
                    background: `--md-sys-color-inverse-surface${this.suffix}`,
                    foreground: `--md-sys-color-inverse-on-surface${this.suffix}`,
                },
                {
                    name: "Inverse On Surface",
                    background: `--md-sys-color-inverse-on-surface${this.suffix}`,
                    foreground: `--md-sys-color-inverse-surface${this.suffix}`,
                },
            ],
            [
                {
                    name: "Outline",
                    background: `--md-sys-color-outline${this.suffix}`,
                    foreground: `--md-sys-color-surface${this.suffix}`,
                },
                {
                    name: "Outline Variant",
                    background: `--md-sys-color-outline-variant${this.suffix}`,
                    foreground: `--md-sys-color-on-surface${this.suffix}`,
                },
                {
                    name: "Shadow",
                    background: `--md-sys-color-shadow${this.suffix}`,
                    foreground: `--md-sys-color-surface${this.suffix}`,
                },
                {
                    name: "Scrim",
                    background: `--md-sys-color-scrim${this.suffix}`,
                    foreground: `--md-sys-color-surface${this.suffix}`,
                },
            ],
        ];
    }

    render() {
        const roles = this.buildRoles();
        return html`
      <div class="color-scheme">
        ${roles.map(
            (group) => html`
            <div class="row color-family">
              ${group.map((role) => {
                return html`
                  <color-box
                    name=${role.name}
                    background=${role.background}
                    foreground=${role.foreground}
                  ></color-box>
                `;
            })}
            </div>
          `
        )}
      </div>
    `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        [tagName]: ColorScheme;
    }
}
