import { html } from "lit-element";
import { AustraliaOptions } from "../model/AustraliaTaxOptions.js";

/**
 * @param {AustraliaOptions} australiaOptions
 */
const AustraliaTaxOptionsViewTemplate = (australiaOptions) => html`
    <div class="list-group">
        <div class="list-group-item">
            <div class="options-item">
                <div class="title-container">
                    <h5 class="option-description">Australian Resident</h5>
                    <small>
                        Can be a resident for tax purposes without being a citizen or permanent resident or may have a visa to enter Australia, but
                        are not a resident for tax purposes
                    </small>
                </div>
                <div>
                    <input
                        id="resident"
                        type="checkbox"
                        name="resident"
                        ?checked="${australiaOptions.isResident}"
                        class="toggle toggle-round cmn-toggle cmn-toggle-round"
                    />
                    <label for="resident"></label>
                </div>
            </div>
        </div>
    </div>
`;

export { AustraliaTaxOptionsViewTemplate };
