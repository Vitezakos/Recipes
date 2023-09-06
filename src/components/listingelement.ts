import {
  LitElement,
  html,
  customElement,
  property,
  css,
  queryAll,
} from "lit-element";
import close from "../images/close.png";
import add from "../images/add.png";
@customElement("my-listing")
export class MyList extends LitElement {
  static styles = css`
    .ingredients {
      display: flex;
      align-items: baseline;
      gap: 2rem;
    }
    ::placeholder {
      color: #000;
      font-family: Magra;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    #name {
      border-radius: 11px;
      background: #a7a5a5;
      width: 302px;
      height: 44px;
    }
    #quantity {
      border-radius: 11px;
      background: #a7a5a5;
      width: 186px;
      height: 44px;
    }
    .hidden {
      display: none;
    }
    .ingredient-add {
      position: absolute;
      bottom: 15px;
      right: -50px;
    }
    .ingredients #delete-btn {
      background: none;
      border: none;
    }
    .ingredients #delete-btn img {
      width: 32px;
      height: 32px;
    }
    .ingredient-add {
      background: none;
      border: none;
    }
    .ingredient-add img {
      width: 32px;
      height: 32px;
    }
  `;

  @property()
  name = "Somebody";
  @queryAll("#delete-btn")
  _button!: NodeListOf<HTMLButtonElement>;
  @queryAll("#list-btn")
  _lbtn!: NodeListOf<HTMLButtonElement>;
  render() {
    return html`<div class="ingredients">
        <input type="text" id="name" placeholder="Name..." />
        <input type="text" id="quantity" placeholder="Quantity..." />
        <button @click=${this.showList}>unit</button>
        <ul class="hidden" id="measurements">
          <li>L</li>
          <li>g</li>
        </ul>
      </div>
      <button class="ingredient-add" @click=${this.addNewListing}>
        <img src=${add} />
      </button>`;
  }
  removeListing() {
    this.parentElement?.parentElement?.remove();
  }
  newLine = `<div class="ingredients">
    <input type="text" id="name" placeholder="Name..." />
    <input type="text" id="quantity" placeholder="Quantity..." />
    <button id=list-btn>unit</button>
        <ul class="hidden" id="measurements">
          <li>L</li>
          <li>g</li>
        </ul>
    <button id="delete-btn"><img src=${close}></button>
  </div>`;
  addNewListing() {
    let div = document.createElement("div");
    div.innerHTML = this.newLine;
    this.shadowRoot?.append(div);
    this._button[this._button.length - 1].addEventListener(
      "click",
      this.removeListing
    );
    this._lbtn[this._lbtn.length - 1].addEventListener("click", this.showList2);
  }
  showList() {
    const ul = this.shadowRoot?.querySelector("#measurements");
    ul?.classList.toggle("hidden");
  }
  showList2() {
    this.parentElement
      ?.querySelector("#measurements")
      ?.classList.toggle("hidden");
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "my-listing": MyList;
  }
}
