import { LitElement, html, customElement, property, css } from "lit-element";
import add from "../images/add.png";
@customElement("my-button")
export class MyButton extends LitElement {
  static styles = css`
    button {
      width: 183px;
      height: 46px;
      flex-shrink: 0;
      border-radius: 13px;
      background: rgba(255, 0, 0, 0.5);
      color: #000;
      font-family: K2D;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    button:active {
      border: 1px solid #000;
      background: rgba(187, 12, 12, 0.63);
    }
    img {
      width: 10px;
      height: 10px;
    }
    a:link {
      text-decoration: none;
    }

    a:visited {
      text-decoration: none;
    }

    a:hover {
      text-decoration: none;
    }

    a:active {
      text-decoration: none;
    }
    a {
      color: #000000;
    }
  `;

  @property()
  name?: string = "Yes";

  @property()
  showIcon: boolean = false;

  @property()
  link: "" | "recipe" | "shopping" = "";

  render() {
    return html`<button>
      ${this.link
        ? html`<a href="${this.link}.html"
            >${this.name}
            ${this.showIcon ? html`<img src=${add}></i>` : null}</a
          >`
        : html`${this.name} ${this.showIcon ? html`<img src=${add}></i>` : null}`}
    </button>`;
  }
  set name2(newName: string) {
    this.name = newName;
    this.requestUpdate("name", newName);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-button": MyButton;
  }
}
