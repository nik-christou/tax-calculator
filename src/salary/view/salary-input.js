// @ts-check

import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../../base/base-element-mixin.js";
import { SalaryTypes } from "../control/salary-type-enum.js";
import { SalaryDetails } from "../model/salary-details.js";

export class SalaryInput extends BaseElementMixin(LitElement) {
    render() {
        return html`
            <div>
                <label for="salary">Salary:</label>
                <input type="number" id="salary" min="0" placeholder="eg 20000" />
                <select id="salaryType"></select>
                <br />
                <div>
                    <input type="checkbox" id="thirteen" name="thirteen" checked />
                    <label for="thirteen">Includes 13th salary</label>
                </div>
            </div>
        `;
    }

    firstUpdated() {
        const salaryElement = this.shadowRoot.querySelector("input#salary");
        const salaryTypeElement = this.shadowRoot.querySelector("select#salaryType");
        const thirteenSalaryElement = this.shadowRoot.querySelector("input#thirteen");

        salaryElement.addEventListener("input", event => this._handleSalaryDetailsChange(event));
        salaryTypeElement.addEventListener("input", event => this._handleSalaryDetailsChange(event));
        thirteenSalaryElement.addEventListener("input", event => this._handleSalaryDetailsChange(event));

        this._addSalaryTypesFromEnum(salaryTypeElement);
    }

    /**
     * @param {HTMLSelectElement} salaryTypeElement
     */
    _addSalaryTypesFromEnum(salaryTypeElement) {
        Object.keys(SalaryTypes).forEach(type => {
            const salaryType = SalaryTypes[type];
            const optionItem = new Option(salaryType.type, salaryType.id, false, false);

            salaryTypeElement.add(optionItem);
        });
    }

    /**
     * @param {InputEvent} event
     */
    _handleSalaryDetailsChange(event) {
        this._dispatchSalaryDetailsChangeEvent();
    }

    _getSalaryType() {
        const salaryTypeElement = this.shadowRoot.querySelector("select#salaryType");
        const selectedOption = salaryTypeElement.selectedOptions[0];
        const selectedOptionValue = Number(selectedOption.value);

        if (selectedOptionValue === SalaryTypes.ANNUAL.id) {
            return SalaryTypes.ANNUAL;
        }

        return SalaryTypes.MONTHLY;
    }

    _getSalaryAmount() {
        const salaryElement = this.shadowRoot.querySelector("input#salary");
        return salaryElement.value;
    }

    _getThirteenSalaryCheck() {
        const thirteenSalaryElement = this.shadowRoot.querySelector("input#thirteen");
        return thirteenSalaryElement.checked;
    }

    _dispatchSalaryDetailsChangeEvent() {
        const salaryDetails = new SalaryDetails(this._getSalaryAmount(), this._getSalaryType(), this._getThirteenSalaryCheck());

        const salaryDetailsChangeEvent = new CustomEvent("salary-details-change", {
            bubbles: true,
            composed: true,
            detail: salaryDetails
        });

        this.dispatchEvent(salaryDetailsChangeEvent);
    }
}

window.customElements.define("salary-input", SalaryInput);
