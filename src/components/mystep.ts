import {
  html,
  css,
  LitElement,
  customElement,
  queryAll,
  property,
} from "lit-element";
import close from "../images/close.png";
import add from "../images/add.png";
@customElement("my-steps")
export class MySteps extends LitElement {
  static styles = css`
    .steps {
      display: flex;
      align-items: center;
      margin-bottom: 26.8px;
      position: relative;
    }
    textarea {
      width: 631px;
      height: 106px;
      border-radius: 11px;
      background: #a7a5a5;
      color: #000;
      font-family: Magra;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    textarea::placeholder {
      color: #000;
      font-family: Magra;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .steps-add {
      position: absolute;
      right: -40px;
      bottom: 39px;
    }
    #first-remove {
      visibility: hidden;
    }
    .steps-remove {
      right: 30px;
      position: absolute;
    }
    .steps .steps-remove {
      background: none;
      border: none;
    }
    .steps .steps-remove img {
      width: 32px;
      height: 32px;
    }
    .steps-add {
      background: none;
      border: none;
    }
    .steps-add img {
      width: 32px;
      height: 32px;
    }
  `;
  @property()
  template = `<div class="steps">
    <textarea class="description" placeholder='Describe this step...'>
</textarea
    >
    <button class="steps-remove"><img src=${close}></i></button>
  </div>`;

  @queryAll(".steps-remove")
  _remove_button!: NodeListOf<HTMLButtonElement>;

  @queryAll(".description")
  _textarea!: NodeListOf<HTMLTextAreaElement>;

  render() {
    return html`<div class="steps">
        <textarea
          class="description"
          placeholder="Describe this step..."
        ></textarea>
        <button id="first-remove">X</button>
      </div>
      <button class="steps-add" @click=${this.createStep}>
        <img src=${add} />
      </button>`;
  }
  get description() {
    return Array.from(this._textarea).map((element) => element.value);
  }
  removeStep() {
    this.parentElement?.parentElement?.remove();
  }

  createStep() {
    let div = document.createElement("div");
    div.innerHTML = this.template;
    this.shadowRoot?.append(div);
    this._remove_button[this._remove_button.length - 1].addEventListener(
      "click",
      this.removeStep
    );
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "my-steps": MySteps;
  }
}
