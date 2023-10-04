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
interface ingredientsBlueprint {
  ingredientsName: String[];
  ingredientsQuantity: String[];
  ingredientsUnit: String[];
}
@customElement("my-listing")
export class MyList extends LitElement {
  static styles = css`
    .ingredients {
      display: flex;
      align-items: center;
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
      bottom: 8px;
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
    .ingredients .list-btn {
      border-radius: 11px;
      background: #a7a5a5;
      width: 80px;
      height: 44px;
      color: #000;
      font-family: Magra;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    ul {
      color: #000;
      font-family: Magra;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      background: #a7a5a5;
      margin: 0px;
      border-radius: 11px;
      padding: 0px;
      padding-left: 30px;
      padding-right: 10px;
      border-radius: 6px;
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
  @property()
  template = `<div class="ingredients">
  <input type="text" class="name" placeholder="Name..." />
  <input type="text" class="quantity" placeholder="Quantity..." />
  <button class=list-btn>unit</button>
      <ul class="hidden" class="measurements">
        <li>g</li>
        <li>L</li>
      </ul>
  <button class="delete-btn"><img src=${close}></button>
</div>`;
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
    const target = e.currentTarget as HTMLElement;
    target.parentElement?.classList.toggle("hidden");
    this._lbtn[0].innerText = target.innerText;
  }
  handleList2(e: MouseEvent) {
    const target = e.currentTarget as HTMLLIElement;
    target.parentElement!.classList.toggle("hidden");
    const btn = target!.parentElement!.previousElementSibling!;
    btn.innerHTML = target.innerHTML;
  }
  get ingredients() {
    let ingredientsName = [];
    let ingredientsQuantity = [];
    let ingredientsUnit = [];
    for (let i = 0; i < this._inputName.length; i++) {
      ingredientsName[i] = this._inputName[i].value;
      ingredientsQuantity[i] = this._inputQuantity[i].value;
      ingredientsUnit[i] = this._lbtn[i].innerHTML;
    }
    let ingredientsAll = {} as ingredientsBlueprint;
    ingredientsAll["ingredientsName"] = ingredientsName;
    ingredientsAll["ingredientsQuantity"] = ingredientsQuantity;
    ingredientsAll["ingredientsUnit"] = ingredientsUnit;
    return ingredientsAll;
  }
  removeListing() {
    this.parentElement?.parentElement?.remove();
  }
  addNewListing() {
    let div = document.createElement("div");
    div.innerHTML = this.template;
    this.shadowRoot?.append(div);
    div.querySelectorAll("li").forEach((target) => {
      target.addEventListener("click", this.handleList2);
    });
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
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "my-listing": MyList;
  }
}
