import { LitElement, html } from 'lit-element';
import { BaseElementMixin } from './base/base-element-mixin.js';
import { TaxCalculatorCss } from './tax-calculator.css.js';

export class TaxCalculator extends BaseElementMixin(LitElement) {

  static get properties() {
    return {
    }
  };

  static get styles() {
    return [
      ...super.styles,
      TaxCalculatorCss
    ];
  }

  render() {
    return html`
      <div class="container">
        <h2>Tax calculator</h2>
      </div>
    `;
  }
}

window.customElements.define('tax-calculator', TaxCalculator);
