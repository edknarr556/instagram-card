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
this.posts = data.posts || [];
this.authors = data.authors || [];
this.currentIndex = 0;
    } catch (e) {
      this.error = "Could not load JSON data.";
      this.posts = [];
this.authors = [];
      console.error(e);
    }

    this.loading = false;
  }
_previousImage() {
  if (!this.posts?.length) return;
  this.currentIndex =
    (this.currentIndex - 1 + this.posts.length) % this.posts.length;
}

_nextImage() {
  if (!this.posts?.length) return;
  this.currentIndex = (this.currentIndex + 1) % this.posts.length;
}

_setImage(index) {
  if (!this.posts?.length) return;
  this.currentIndex = index;
}

toggleLike() {
  const post = this.posts?.[this.currentIndex];
  if (!post) return;

  post.liked = !post.liked;

  // save to localStorage
  localStorage.setItem(
    "liked-" + post.postID,
    post.liked ? "true" : "false"
  );

  this.requestUpdate();
}

addComment() {
  const comment = prompt("Enter a comment:");
  if (!comment) return;

  const post = this.posts?.[this.currentIndex];
  if (!post) return;

  if (!post.comments) {
    post.comments = [];
  }

  post.comments = [...post.comments, comment];

  // save comments to localStorage
  localStorage.setItem(
    "comments-" + post.postID,
    JSON.stringify(post.comments)
  );

  this.requestUpdate();
}

updated(changedProperties) {
  if (changedProperties.has("currentIndex")) {
    const post = this.posts?.[this.currentIndex];
    if (!post) return;

    // load like state
    const liked = localStorage.getItem("liked-" + post.postID);
    post.liked = liked === "true";

    // load comments
    const comments = localStorage.getItem("comments-" + post.postID);
    post.comments = comments ? JSON.parse(comments) : [];
  }
}

sharePost() {
  const post = this.posts?.[this.currentIndex];
  if (!post) return;

  alert(`Shared: ${post.title}`);
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
        margin: var(--ddd-spacing-2) auto;
        padding: var(--ddd-spacing-4);
        max-width: 430px;
      }

      .carousel {
        width: 100%;
        aspect-ratio: 4 / 5;
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
        padding: 0 8px;
        box-sizing: border-box;
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
                    <small>${author.channel}</small>
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
                    loading="lazy"
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

                  <button class="action-button" @click="${this.addComment}">
                    Comment
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
                  <h4>${post.title}</h4>
                  <p>${post.caption}</p>

                  ${post.comments?.length
                    ? html`
                        <div class="comments">
                          <strong>Comments:</strong>
                          ${post.comments.map(
                            (comment) =>
                              html`<p class="comment">• ${comment}</p>`
                          )}
                        </div>
                      `
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