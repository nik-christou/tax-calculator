import {LitElement, html} from 'lit';
import {BaseElementMixin} from './base/BaseElementMixin.js';
import {TaxCalculatorAppCss} from './TaxCalculatorAppCss.js';

export class TaxCalculatorApp extends BaseElementMixin(LitElement) {

    static get styles() {
        return [
            ...super.styles, 
            TaxCalculatorAppCss
        ];
    }
    
    render() {
        return html`
            <div class="main">
                <div id="outlet"></div>
            </div>
        `;
    }

    // createRenderRoot() {
    //     return this;
    // }
}
