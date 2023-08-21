import { LitElement, html, customElement, property, css } from "lit-element";
import Soup from "../images/onion-soup.png";
import Arrow from "../images/arrow-down.png";
@customElement("body-element")
export class CardElement extends LitElement {
  static styles = css`
    .container {
      display: flex;
      border-radius: 15px;
      background: #222;
    }
    .container .details {
      display: none;
      border-left: white solid 1px;
      padding: 1rem;
    }
    .container .main {
      display: flex;
      flex-direction: column;
    }
    .container .main img {
      width: 303px;
      height: 196px;
    }
    .container .main .bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
    }
    .container .main .bottom button {
      width: 92px;
      height: 33px;
      align-content: center;
      border-radius: 10px;
      border: 1px solid #fff;
      background: rgba(177, 171, 171, 0.66);
      color: #000;
      font-family: K2D;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .container .main .bottom button img {
      width: 10px;
      height: 10px;
    }
    .container .main .bottom .desc {
      color: #fff;
      font-family: K2D;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .container .details.show {
      display: flex;
    }
  `;

  @property()
  image = Soup;

  render() {
    return html`<div class="container">
      <div class="main">
        <img src=${this.image} />
        <div class="bottom">
          <div class="desc">
            <p>
              This is just some random text as placeholder so I have something
              here
            </p>
          </div>
          <button @click=${this.showContent}>Steps <img src=${Arrow} /></button>
        </div>
      </div>
      <div class="details">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    </div>`;
  }
  showContent() {
    const details = this.shadowRoot?.querySelector(".details");
    details?.classList.toggle("show");
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "card-element": CardElement;
  }
}
