import { html, fixture, expect } from '@open-wc/testing';
import "../instagram-card.js";

describe("InstagramCard test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <instagram-card
        title="title"
      ></instagram-card>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
