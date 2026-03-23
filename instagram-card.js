/**
 * Copyright 2026 Elijah Knarr
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./dot-indicators.js";

export class InstagramCard extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "instagram-card";
  }

  static get properties() {
    return {
      items: { type: Array },
      currentIndex: { type: Number },
      loading: { type: Boolean },
      error: { type: String },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.currentIndex = 0;
    this.loading = false;
    this.error = "";

    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Instagram Card",
      previous: "Previous",
      next: "Next",
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    this.error = "";

    try {
      const response = await fetch(new URL("./data.json", import.meta.url));
      if (!response.ok) {
        throw new Error("Failed to load JSON data");
      }

      const data = await response.json();
      this.items = data;
      this.currentIndex = 0;
    } catch (e) {
      this.error = "Could not load JSON data.";
      this.items = [];
      console.error(e);
    }

    this.loading = false;
  }

  _previousImage() {
    if (!this.items?.length) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  _nextImage() {
    if (!this.items?.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  _setImage(index) {
    if (!this.items?.length) return;
    this.currentIndex = index;
  }

  _onPointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    this._touchStartX = event.clientX;
  }

  _onPointerUp(event) {
    if (typeof this._touchStartX !== "number") return;
    const delta = event.clientX - this._touchStartX;

    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        this._nextImage();
      } else {
        this._previousImage();
      }
    }

    this._touchStartX = undefined;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }

        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }

        .carousel {
          width: 100%;
          height: 500px;
          overflow: hidden;
          border-radius: 12px;
          background: #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .carousel img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .controls {
          position: absolute;
          top: 50%;
          width: 100%;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }

        .control-button {
          pointer-events: all;
          background-color: rgba(0, 0, 0, 0.48);
          border: none;
          color: white;
          font-size: var(--ddd-font-size-xl);
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 50%;
          cursor: pointer;
        }

        .post-info {
          margin-top: 12px;
        }

        .image-count {
          margin-top: var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-xs);
          color: var(--ddd-theme-secondary);
        }
      `,
    ];
  }

  render() {
    const item = this.items?.[this.currentIndex];

    return html`
      <div class="wrapper">
        ${this.loading
          ? html`<p>Loading posts...</p>`
          : this.error
            ? html`<p>${this.error}</p>`
            : item
              ? html`
                  <h3><span>User:</span> ${item.username}</h3>

                  <div
                    class="carousel"
                    @pointerdown="${this._onPointerDown}"
                    @pointerup="${this._onPointerUp}"
                  >
                    <img
                      src="${item.image}"
                      alt="${item.alt}"
                      loading="lazy"
                    />

                    <div class="controls">
                      <button
                        class="control-button"
                        @click="${this._previousImage}"
                        aria-label="${this.t.previous}"
                      >
                        ❮
                      </button>
                      <button
                        class="control-button"
                        @click="${this._nextImage}"
                        aria-label="${this.t.next}"
                      >
                        ❯
                      </button>
                    </div>
                  </div>

                  <dot-indicators
                    .count="${this.items.length}"
                    .current="${this.currentIndex}"
                    @dot-click="${(e) => this._setImage(e.detail)}"
                  ></dot-indicators>

                  <div class="post-info">
                    <h4>${item.title}</h4>
                    <p>${item.caption}</p>
                  </div>

                  <div class="image-count">
                    ${this.currentIndex + 1} / ${this.items.length}
                  </div>
                `
              : html`<p>No items found.</p>`}
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(InstagramCard.tag, InstagramCard);