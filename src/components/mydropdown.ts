import {
  LitElement,
  html,
  customElement,
  property,
  css,
  queryAll,
  query,
} from "lit-element";

@customElement("drop-down")
export class DropDown extends LitElement {
  static styles = css`
    li {
      display: none;
      background-color: red;
      margin: 4px;
      width: 50px;
    }
    .show {
      display: block;
    }
  `;
  @property()
  list: any = [];
  @queryAll("li")
  _li!: NodeListOf<HTMLButtonElement>;
  @query("button")
  _button!: HTMLButtonElement;

  render() {
    return html`${this.list.length
      ? html`<button @click=${this.showList}>${this.list[0]}</button>
          <ul>
            ${this.list.map(
              (i: number) => html`<li @click=${this.handleList}>${i}</li>`
            )}
          </ul>`
      : null}`;
  }
  get buttonValue() {
    return this._button.innerText;
  }

  showList() {
    this._li.forEach((elem) => elem.classList.toggle("show"));
  }
  handleList(e: MouseEvent) {
    this._li.forEach((elem) => elem.classList.toggle("show"));
    const target = e.currentTarget as HTMLElement;
    this._button.innerText = target.innerText;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "drop-down": DropDown;
  }
}
