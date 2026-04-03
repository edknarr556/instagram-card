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
    posts: { type: Array },
    authors: { type: Array },
    currentIndex: { type: Number },
    loading: { type: Boolean },
    error: { type: String },
  };
}

  constructor() {
  super();
  this.posts = [];
  this.authors = [];
  this.currentIndex = 0;
  this.loading = false;
  this.error = "";
  this._touchStartX = 0;

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
  window.addEventListener("popstate", this._handlePopState);
  this.loadData();
}

disconnectedCallback() {
  window.removeEventListener("popstate", this._handlePopState);
  super.disconnectedCallback();
}

_handlePopState = () => {
  const params = new URLSearchParams(window.location.search);
  const index = Number(params.get("activeIndex"));
  if (!Number.isNaN(index) && this.posts?.length) {
    this.currentIndex = Math.max(0, Math.min(index, this.posts.length - 1));
  }
};

async loadData() {
  this.loading = true;
  this.error = "";

  try {

    const response = await fetch("/api/posts");
//const response = await fetch(new URL("./data.json", import.meta.url));    if (!response.ok) {
      throw new Error("Failed to load JSON data");
    }

    const data = await response.json();
    this.posts = data.posts || [];
    this.authors = data.authors || [];

    const params = new URLSearchParams(window.location.search);
    const index = Number(params.get("activeIndex"));
    if (!Number.isNaN(index) && this.posts.length) {
      this.currentIndex = Math.max(0, Math.min(index, this.posts.length - 1));
    } else {
      this.currentIndex = 0;
    }

    this._loadLikeState();
  } catch (e) {
    this.error = "Could not load JSON data.";
    this.posts = [];
    this.authors = [];
    console.error(e);
  }

  this.loading = false;
}

_updateRoute() {
  const url = new URL(window.location.href);
  url.searchParams.set("activeIndex", this.currentIndex);
  window.history.replaceState({}, "", url);
}

_loadLikeState() {
  const post = this.posts?.[this.currentIndex];
  if (!post) return;

  const liked = localStorage.getItem("liked-" + post.postID);
  post.liked = liked === "true";
}

_previousImage() {
  if (!this.posts?.length) return;
  this.currentIndex =
    (this.currentIndex - 1 + this.posts.length) % this.posts.length;
  this._loadLikeState();
  this._updateRoute();
}

_nextImage() {
  if (!this.posts?.length) return;
  this.currentIndex = (this.currentIndex + 1) % this.posts.length;
  this._loadLikeState();
  this._updateRoute();
}

_setImage(index) {
  if (!this.posts?.length) return;
  this.currentIndex = index;
  this._loadLikeState();
  this._updateRoute();
}

toggleLike() {
  const post = this.posts?.[this.currentIndex];
  if (!post) return;

  post.liked = !post.liked;
  localStorage.setItem("liked-" + post.postID, post.liked ? "true" : "false");
  this.requestUpdate();
}

sharePost() {
  const post = this.posts?.[this.currentIndex];
  if (!post) return;

  const shareUrl = new URL(window.location.href);
  shareUrl.searchParams.set("activeIndex", this.currentIndex);

  if (navigator.share) {
    navigator.share({
      title: post.title,
      text: post.caption,
      url: shareUrl.toString(),
    });
  } else {
    navigator.clipboard.writeText(shareUrl.toString());
    alert("Link copied to clipboard");
  }
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

@media (prefers-color-scheme: dark) {
  :host {
    color: white;
    background-color: #111;
  }

  .action-button,
  .image-count,
  .post-info,
  .author-row small {
    color: white;
  }
}

      .wrapper {
        margin: var(--ddd-spacing-2) auto;
        padding: var(--ddd-spacing-4);
        max-width: 430px;
      }

      .author-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
      }

      .profile {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        flex: 0 0 40px;
      }

      .carousel {
        width: 100%;
        aspect-ratio: 4 / 5;
        overflow: hidden;
        border-radius: 12px;
        background: #eee;
        position: relative;
      }

      .carousel img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }

      .controls {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        padding: 0 8px;
        box-sizing: border-box;
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

      .action-row {
        display: flex;
        gap: 10px;
        margin-top: 12px;
        margin-bottom: 10px;
      }

      .action-button {
        border: none;
        background: transparent;
        cursor: pointer;
        font: inherit;
        padding: 6px 0;
      }

      .post-info {
        margin-top: 12px;
      }

      .post-info h3 {
        margin: 0 0 6px 0;
      }

      .post-info p {
        margin: 0 0 8px 0;
      }

      .comments {
        margin-top: 10px;
      }

      .comment {
        margin: 4px 0;
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
  const post = this.posts?.[this.currentIndex];
  const author = this.authors?.find((a) => a.authorID === post?.authorID);

  return html`
    <div class="wrapper">
      ${this.loading
        ? html`<p>Loading posts...</p>`
        : this.error
          ? html`<p>${this.error}</p>`
          : post && author
            ? html`
                <div class="author-row">
                  <img
                    class="profile"
                    src="${author.profileImg}"
                    alt="${author.username} profile picture"
                  />
                  <div>
                    <strong>${author.username}</strong><br />
                    <small>${author.channel} • User since ${author.userSince}</small>
                  </div>
                </div>

                <div
                  class="carousel"
                  @pointerdown="${this._onPointerDown}"
                  @pointerup="${this._onPointerUp}"
                >
                  <img
                    src="${post.image}"
                    alt="${post.alt}"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                  />

                  <div class="controls">
                    <button
                      class="control-button"
                      @click="${this._previousImage}"
                      aria-label="Previous post"
                    >
                      ❮
                    </button>
                    <button
                      class="control-button"
                      @click="${this._nextImage}"
                      aria-label="Next post"
                    >
                      ❯
                    </button>
                  </div>
                </div>

                <div class="action-row">
                  <button class="action-button" @click="${this.toggleLike}">
                    ${post.liked ? "❤️ Like" : "🤍 Like"}
                  </button>

                  <button class="action-button" @click="${this.sharePost}">
                    Share
                  </button>
                </div>

                <dot-indicators
                  .count="${this.posts.length}"
                  .current="${this.currentIndex}"
                  @dot-click="${(e) => this._setImage(e.detail)}"
                ></dot-indicators>

                <div class="post-info">
                  <h3>${post.title}</h3>
                  <p>${post.caption}</p>
                  ${post.dateTaken
                    ? html`<small>Date taken: ${post.dateTaken}</small>`
                    : ""}
                </div>

                <div class="image-count">
                  ${this.currentIndex + 1} / ${this.posts.length}
                </div>
              `
            : html`<p>No posts found.</p>`}
    </div>
  `;
}
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(InstagramCard.tag, InstagramCard);