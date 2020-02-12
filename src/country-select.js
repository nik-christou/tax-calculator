// @ts-check

import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "./base/base-element-mixin.js";

export class CountrySelect extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            data: JSON
        };
    }

    render() {
        return html`
            <select></select>
        `;
    }

    /**
     * @param {Map} changedProperties
     */
    updated(changedProperties) {

        if(changedProperties.has('data')) {

            const selectElement = this.shadowRoot.querySelector('select');
            this._generateOptions(selectElement);
        }
    }

    /**
     * @param {HTMLSelectElement} selectElement
     */
    _generateOptions(selectElement) {

        if(this.data) {
            this._createOptionItemsFromJsonData(selectElement);
        }
    }

    /**
     * @param {HTMLSelectElement} selectElement
     */
    _createOptionItemsFromJsonData(selectElement) {

        const id = this.data.id;
        const value = this.data.name;
        const optionItem = new Option(value, id, true, true);

        selectElement.add(optionItem);
    }
}

window.customElements.define("country-select", CountrySelect);
