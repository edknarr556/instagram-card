/**
 * Copyright 2026 Elijah Knarr
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./dot-indicator.js";
/**
 * `instagram-card`
 * 
 * @demo index.html
 * @element instagram-card
 */
export class InstagramCard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "instagram-card";
  }

  constructor() {
    super();
    this.title = "";
    this.images = [
      "https://e0.365dm.com/16/07/2048x1152/nfl-james-harrison-pittsburg_3749783.jpg",
      "https://media.gettyimages.com/id/1237041374/photo/pittsburgh-pa-pittsburgh-steelers-quarterback-ben-roethlisberger-looks-down-field-for-a.jpg?s=612x612&w=gi&k=20&c=L-GhXp-X6hlpr3IDWk1QmJqGh5YrNzP2mroC7Ncby1A=",
      
    ]
    this.currentIndex = 0;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Username",
      previous: "Previous",
      next: "Next",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/instagram-card.ar.json", import.meta.url).href +
        "/../",
    });
  }

  // Lit reactive properties
  static get properties() {
  return {
    title: { type: String },
    images: { type: Array },
    currentIndex: { type: Number },
    loading: { type: Boolean },
  };
}
  updated(changedProperties) {
  if (
    changedProperties.has("images") &&
    (!this.images?.length || this.currentIndex >= this.images.length)
  ) {
    this.currentIndex = 0;
  }
}

  _previousImage() {
    if (!this.images?.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  _nextImage() {
    if (!this.images?.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  _setImage(index) {
    if (!this.images?.length) return;
    this.currentIndex = index % this.images.length;
  }

  _onPointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    this._touchStartX = event.clientX;
  }

  _onPointerUp(event) {
    if (typeof this._touchStartX !== "number") {
      return;
    }
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

  // Lit scoped styles
  static get styles() {
    return [super.styles,
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
        position: relative;
        border-radius: var(--ddd-radius-md);
        overflow: hidden;
        border: var(--ddd-border-md);
        background: var(--ddd-theme-surface);
      }
      .carousel img {
        width: 100%;
        height: auto;
        display: block;
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
      .indicator-row {
        margin-top: var(--ddd-spacing-2);
        display: flex;
        justify-content: center;
        gap: var(--ddd-spacing-1);
      }
      
  
      .image-count {
        margin-top: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-xs);
        color: var(--ddd-theme-secondary);
      }
      h3 span {
        font-size: var(--instagram-card-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    const image = this.images?.[this.currentIndex] || "";
    return html`
<div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>
  <div class="carousel" @pointerdown="${this._onPointerDown}" @pointerup="${this._onPointerUp}">
    <img src="${image}" alt="${this.title || "Instagram"} image ${this.currentIndex + 1}" loading="lazy" />
    <div class="controls">
      <dot-indicators
  .count="${this.images.length}"
  .current="${this.currentIndex}"
  @dot-click="${(e) => this._setImage(e.detail)}"
></dot-indicators>
    </div>
  </div>
  <div class="image-count">
    ${this.currentIndex + 1} / ${this.images.length}
  </div>
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(InstagramCard.tag, InstagramCard);