import {html} from 'lit';
import {BaseElement} from './base/BaseElement.js';
import {TaxCalculatorAppCss} from './TaxCalculatorAppCss.js';
import {HostCssTaggedTemplate} from '@twbs-css/template-literals';

export class TaxCalculatorApp extends BaseElement {

    static styles = [
        HostCssTaggedTemplate,
        BaseElement.styles,
        TaxCalculatorAppCss
    ];
    
    render() {
        return html`
            <div class="main">
                <div id="outlet"></div>
            </div>
        `;
    }
}
