import { LitElement, html, css} from "lit-element";
import { BaseElementMixin } from "../../../base/BaseElementMixin.js";
import { ListGroupCss } from "../../../base/ListGroupCss.js";
import { CountryOptions } from "../../../model/CountryOptions.js";

export class AustraliaOptionsView extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            countryOptions: CountryOptions
        };
    }

    static get styles() {
        return [
            ...super.styles,
            ListGroupCss,
            css`
                .options-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .options-item .resident-input-group {
                    display: flex;
                    margin-top: 10px;
                }
            `
        ];
    }

    render() {
        return html`
            <div class="list-group">
                <div class="list-group-item">
                    <div class="options-container">
                        <div class="options-item">
                            <span class="option-description">Resident</span>
                            <div class="resident-input-group">
                                <input type="checkbox" ?checked="${this.countryOptions.resident}" id="resident" class="switch" name="resident" />
                                <label for="resident">Resident</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    constructor() {
        super();
        this.countryOptions = new CountryOptions();
    }
}

window.customElements.define("australia-options-view", AustraliaOptionsView);
