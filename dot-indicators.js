import { LitElement, html, css } from "lit";

export class DotIndicators extends LitElement {
  static get tag() {
    return "dot-indicators";
  }

  static get properties() {
    return {
      count: { type: Number },
      current: { type: Number },
    };
  }

  constructor() {
    super();
    this.count = 0;
    this.current = 0;
  }

  static get styles() {
    return css`
      .dots {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 10px;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ccc;
        cursor: pointer;
      }

      .dot.active {
        background: #1f63c6;
        transform: scale(1.2);
      }
    `;
  }

  _handleClick(i) {
    this.dispatchEvent(
      new CustomEvent("dot-click", {
        detail: i,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="dots">
        ${Array.from({ length: this.count }).map(
          (_, i) => html`
            <span
              class="dot ${this.current === i ? "active" : ""}"
              @click="${() => this._handleClick(i)}"
            ></span>
          `
        )}
      </div>
    `;
  }
}

customElements.define(DotIndicators.tag, DotIndicators);