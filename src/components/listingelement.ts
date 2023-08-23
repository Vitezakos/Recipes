import {
  LitElement,
  html,
  customElement,
  property,
  css,
  queryAll,
} from "lit-element";
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
  `;

  @property()
  name = "Somebody";
  @queryAll("#delete-btn")
  _button!: NodeListOf<HTMLButtonElement>;

  render() {
    return html`<div class="ingredients">
        <input type="text" id="name" placeholder="Name..." />
        <input type="text" id="quantity" placeholder="Quantity..." />
      </div>
      <button class="ingredient-add" @click=${this.addNewListing}>+</button>`;
  }
  removeListing() {
    this.parentElement?.remove();
  }
  newLine = `<div class="ingredients">
    <input type="text" id="name" placeholder="Name..." />
    <input type="text" id="quantity" placeholder="Quantity..." />
    <button id="delete-btn">X</button>
  </div>`;
  addNewListing() {
    let div = document.createElement("div");
    div.innerHTML = this.newLine;
    this.shadowRoot?.append(div);
    this._button[this._button.length - 1].addEventListener(
      "click",
      this.removeListing
    );
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "my-listing": MyList;
  }
}
