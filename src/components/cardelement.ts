import {
  LitElement,
  html,
  customElement,
  property,
  css,
  query,
  PropertyValueMap,
} from "lit-element";
import Soup from "../images/onion-soup.png";
import Arrow from "../images/arrow-down.png";
import Add from "../images/add.png";
import LeftArrow from "../images/arrow-left.png";
@customElement("card-element")
export class CardElement extends LitElement {
  static styles = css`
    .container {
      display: flex;
      border-radius: 15px;
      background: #222;
    }
    .container .details {
      display: none;
      border-left: #959292 solid 1px;
      padding: 1rem;
      position: relative;
      width: max-content;
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
    .container .main .bottom h2 {
      color: #fff;
      font-family: K2D;
      font-style: normal;
      line-height: normal;
      margin: 0px;
    }
    .container .main .bottom .desc {
      color: #fff;
      font-family: K2D;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      width: 250px;
    }
    .container .details.show {
      display: flex;
    }
    .container .main .bottom .steps.hidden {
      display: none;
    }
    .container .main .bottom .add {
      display: none;
    }
    .container .main .bottom .add.show {
      display: block;
    }
    .container .details .close img {
      width: 27px;
      height: 27px;
      margin-left: -8px;
      margin-top: -3px;
    }
    .container .details .close {
      width: 27px;
      height: 27px;
      position: absolute;
      right: 10px;
      bottom: 10px;
      background: none;
      border: none;
    }
    .container .details-li {
      color: #fff;
      font-family: K2D;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `;

  @property()
  image = Soup;
  @property()
  title = "";
  @property()
  ingredientsName = "";
  @property()
  ingredientsQuantity = "";
  @property()
  ingredientsUnit = "";
  @property()
  description = "";
  @query(".desc")
  _desc!: HTMLDivElement;
  @query(".details-li")
  _ul!: HTMLUListElement;
  @query(".steps")
  _stepBtn!: HTMLButtonElement;
  @query(".add")
  _addBtn!: HTMLButtonElement;
  @query(".name")
  _name!: HTMLHeadingElement;
  render() {
    return html`<div class="container">
      <div class="main">
        <img src=${this.image} />
        <div class="bottom">
          <h2 class="name">${this.title}</h2>
          <div class="desc"></div>
          <button class="steps" @click=${this.toggleContent}>
            Steps <img src=${Arrow} />
          </button>
          <button class="add" @click=${this.storeContent}>
            Add <img src=${Add} />
          </button>
        </div>
      </div>
      <div class="details">
        <ul class="details-li"></ul>
        <button class="close" @click=${this.toggleContent}>
          <img src=${LeftArrow} />
        </button>
      </div>
    </div>`;
  }
  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null
  ): void {
    if (name == "title") {
      this.title = value as string;
    }
    if (name == "ingredientsname") {
      this.ingredientsName = value as string;
    }
    if (name == "ingredientsquantity") {
      this.ingredientsQuantity = value as string;
    }
    if (name == "ingredientsunit") {
      this.ingredientsUnit = value as string;
    }
    if (name == "description") {
      this.description = value as string;
    }
  }
  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has("ingredientsName")) {
      const names = JSON.parse(this.ingredientsName);
      names.forEach((e: string, i: number) => {
        let div = document.createElement("div");
        div.innerHTML = `<span>${e}</span><span> </span>`;
        div.className = `ingredient-${i}`;
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.justifyContent = "space-between";
        this._desc?.appendChild(div);
      });
    }
    if (_changedProperties.has("ingredientsQuantity")) {
      const names = JSON.parse(this.ingredientsQuantity);
      names.forEach((e: string, i: number) => {
        let span = document.createElement("span");
        span.innerHTML = e;
        span.className = `span-${i}`;
        this._desc.querySelector(`.ingredient-${i}`)?.appendChild(span);
      });
    }
    if (_changedProperties.has("ingredientsUnit")) {
      const names = JSON.parse(this.ingredientsUnit);
      names.forEach((e: string, i: number) => {
        this._desc.querySelector(`.span-${i}`)?.append(e);
      });
    }
    if (_changedProperties.has("description")) {
      const names = JSON.parse(this.description);
      names.forEach((e: string) => {
        let li = document.createElement("li");
        li.innerHTML = e;
        this._ul.appendChild(li);
      });
    }
  }
  toggleContent() {
    const details = this.shadowRoot?.querySelector(".details");
    details?.classList.toggle("show");
    this._stepBtn.classList.toggle("hidden");
    this._addBtn.classList.toggle("show");
  }
  storeContent() {
    let shoppingList = {} as any;
    shoppingList.name = this._name.innerText;
    let ingredient = [];
    let length = this._desc.childElementCount;
    for (let i = 0; i < length; i++) {
      ingredient[i] = this.shadowRoot!.querySelector(
        `.ingredient-${i}`
      )?.textContent;
    }
    shoppingList.element = ingredient;
    if (!localStorage.getItem("listing")) {
      localStorage.setItem("listing", "[]");
    }
    if (!localStorage.getItem("listing")?.includes(shoppingList.name)) {
      let shopping = JSON.parse(localStorage.getItem("listing")!);
      shopping.push(shoppingList);
      localStorage.setItem("listing", JSON.stringify(shopping));
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "card-element": CardElement;
  }
}
