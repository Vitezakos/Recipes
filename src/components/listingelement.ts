import {
  LitElement,
  html,
  customElement,
  property,
  css,
  queryAll,
  PropertyValueMap,
} from "lit-element";
import close from "../images/close.png";
import add from "../images/add.png";
interface ingredientsBlueprint {
  ingredientsName: String[];
  ingredientsQuantity: String[];
}
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
    .name {
      border-radius: 11px;
      background: #a7a5a5;
      width: 302px;
      height: 44px;
    }
    .quantity {
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
    .ingredients .delete-btn {
      background: none;
      border: none;
    }
    .ingredients .delete-btn img {
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
  measure: any = [];
  @queryAll(".delete-btn")
  _button!: NodeListOf<HTMLButtonElement>;
  @queryAll(".list-btn")
  _lbtn!: NodeListOf<HTMLButtonElement>;
  @queryAll(".name")
  _inputName!: NodeListOf<HTMLInputElement>;
  @queryAll(".quantity")
  _inputQuantity!: NodeListOf<HTMLInputElement>;
  @queryAll("li")
  _li!: NodeListOf<HTMLButtonElement>;
  @queryAll("ul")
  _ul!: NodeListOf<HTMLElement>;
  render() {
    return html`<div class="ingredients">
        <input type="text" class="name" placeholder="Name..." />
        <input type="text" class="quantity" placeholder="Quantity..." />
        <button class="list-btn" @click=${this.showList}>unit</button>
        <ul class="hidden" id="measurements">
          ${this.measure.map(
            (i: number) => html`<li @click=${this.handleList}>${i}</li>`
          )}
        </ul>
      </div>
      <button class="ingredient-add" @click=${this.addNewListing}>
        <img src=${add} />
      </button>`;
  }
  handleList(e: MouseEvent) {
    this._ul[this._ul.length - 1].classList.toggle("hidden");
    const target = e.currentTarget as HTMLElement;
    this._lbtn[0].innerText = target.innerText;
  }
  get ingredients() {
    let ingredientsName = [];
    let ingredientsQuantity = [];
    for (let i = 0; i < this._inputName.length; i++) {
      ingredientsName[i] = this._inputName[i].value;
      ingredientsQuantity[i] = this._inputQuantity[i].value;
    }
    let ingredientsAll = {} as ingredientsBlueprint;
    ingredientsAll["ingredientsName"] = ingredientsName;
    ingredientsAll["ingredientsQuantity"] = ingredientsQuantity;
    return ingredientsAll;
  }
  removeListing() {
    this.parentElement?.parentElement?.remove();
  }
  newTemplate = "";
  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has("measure") && this.measure.length > 0) {
      this.newTemplate = `<div class="ingredients">
    <input type="text" class="name" placeholder="Name..." />
    <input type="text" class="quantity" placeholder="Quantity..." />
    <button class=list-btn>unit</button>
        <ul class="hidden" class="measurements">
        ${this.measure.map(
          (i: number) => `<li @click=${this.handleList}>${i}</li>`
        )}
        </ul>
    <button class="delete-btn"><img src=${close}></button>
  </div>`;
    }
  }

  addNewListing() {
    let div = document.createElement("div");
    div.innerHTML = this.newTemplate;
    this.shadowRoot?.append(div);
    this._button[this._button.length - 1].addEventListener(
      "click",
      this.removeListing
    );
    this._lbtn[this._lbtn.length - 1].addEventListener("click", (e) =>
      this.showList2(e)
    );
  }
  showList() {
    this._ul[0].classList.toggle("hidden");
  }
  showList2(e: any) {
    e.currentTarget.nextElementSibling.classList.toggle("hidden");

    // this.parentElement
    //   ?.querySelector(".measurements")
    //   ?.classList.toggle("hidden");
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "my-listing": MyList;
  }
}
