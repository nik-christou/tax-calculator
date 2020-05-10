import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/BaseElementMixin.js";
import { DatabaseManager } from "./datastore/DatabaseManager.js";
import { TaxCalculatorAppCss } from "./TaxCalculatorAppCss.js";
import { SWRegister } from "./SWRegister.js";
import { Router } from "@vaadin/router";
import { routes } from "./Routes.js";

export class TaxCalculatorApp extends BaseElementMixin(LitElement) {
    static get styles() {
        return [...super.styles, TaxCalculatorAppCss];
    }

    render() {
        return html` <div id="outlet"></div> `;
    }

    constructor() {
        super();
        SWRegister.register();
        // DatabaseManager.resetDatabase();
        DatabaseManager.openConnection();
    }

    firstUpdated() {
        this._prepareRouter();
    }

    _prepareRouter() {
        const outletElement = this.shadowRoot.querySelector("#outlet");
        const router = new Router(outletElement);
        router.setRoutes(routes);
    }
}

// @ts-ignore
window.customElements.define("tax-calculator-app", TaxCalculatorApp);
