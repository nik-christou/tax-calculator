import { LitElement, html } from "lit-element";
import { Router } from '@vaadin/router';

import { BaseElementMixin } from "./base/BaseElementMixin.js";
import { SWRegister } from "./SWRegister.js";
import { TaxCalculatorAppCss } from "./TaxCalculatorAppCss.js";
import { BlueprintCss } from "./base/BlueprintCss.js";
import { routes } from "./Routes.js";

import "./navbar/Navbar.js";

export class TaxCalculatorApp extends BaseElementMixin(LitElement) {

    static get styles() {
        return [...super.styles, TaxCalculatorAppCss, BlueprintCss];
    }

    render() {
        return html`
            <div bp="grid">
                <nav-bar bp="12"></nav-bar>
                <main bp="12">
                    <div class="app-container">
                        <a href="/">Home</a>
                        <a href="/countries">Countries</a>
                        <div id="outlet"></div>
                    </div>
                </main>
            </div>
        `;
    }

    firstUpdated() {
        SWRegister.register();
        this._prepareRouter();
    }

    _prepareRouter() {
        const outletElement = this.shadowRoot.getElementById("outlet");
        const router = new Router(outletElement);
        router.setRoutes(routes);
    }
}

window.customElements.define("tax-calculator-app", TaxCalculatorApp);
