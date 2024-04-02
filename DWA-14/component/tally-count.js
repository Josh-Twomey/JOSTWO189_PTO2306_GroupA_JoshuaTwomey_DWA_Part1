import {
  html,
  LitElement,
  css
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";



export class TallyCount extends LitElement {
  static properties = {
    counter: {},
    state : {}
  };

  static styles = css`
    .reset {
      padding: 10px;
      width: 14rem;
    }

    .actions::part(base) {
      height: 7rem;
      width: 7rem;
      line-height: 6rem;
      font-size: 3rem;
    }

    .custom__button__color::part(base) {
      background: var(--sl-color-neutral-0);
      border: solid 1px red;
    }

    .custom__button__color::part(base):hover {
      background: rgba(255, 99, 71, 0.1);
    }

    .custom__button__color::part(base):active {
      background: rgba(255, 99, 71, 0.2);
    }

    .custom__button__color::part(label) {
      color: var(--color-white);
    }

    .custom__button__color::part(label):hover {
      color: rgba(255, 99, 71, 0.8);
    }

    .counter__value {
      width: 100%;
      background-color: var(--color-light-blue);
      color: var(--color-dark-blue);
      border: none;
      height: 15rem;
      text-align: center;
      font-size: 6rem;
    }

    .counter__actions {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  `;

  constructor() {
    super();
    this.counter = 0;
    this.state = "normal"
  }

  render() {
    return html`
      <main class="counter">
        <input
          class="counter__value"
          data-key="number"
          readonly
          value=${this.counter}
        />
        <div class="counter__actions">
          <sl-button
            ?disabled="${this.state === "maxLimit" ? true : false}"
            @click="${this.increase}"
            class="custom__button__color actions counter__actions"
            data-key="add"
            >+</sl-button
          >
          <sl-button
            ?disabled="${this.state === "minLimit" ? true : false}"
            @click="${this.decrease}"
            class="custom__button__color actions counter__actions"
            data-key="subtract"
            >-</sl-button
          >
        </div>
        <sl-button
          @click="${this.reset}"
          class="custom__button__color reset"
          data-key="reset"
          >Reset</sl-button
        >
      </main>
    `;
  }

  increase() {
    this.counter++;
    if (this.counter >= 15) {
      this.state = "maxLimit";
    }

    if (this.state === "minLimit") {
      this.state = "normal"
    }
  }

  decrease() {
    this.counter--;
    if (this.counter <= -5) {
      this.state = "minLimit";
    }
    if (this.state === "maxLimit") {
      this.state = "normal";
    }
  }

  reset() {
    this.counter = 0;
    this.state = "normal"
  }
}


customElements.define('tally-count',TallyCount);