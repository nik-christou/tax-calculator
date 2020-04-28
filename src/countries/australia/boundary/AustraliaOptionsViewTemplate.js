import { html } from "lit-element";
import { AustraliaOptions } from "../entity/AustraliaOptions.js";

/**
 * @param {AustraliaOptions} australiaOptions
 */
const AustraliaOptionsViewTemplate = (australiaOptions) => html`
<div class="list-group">
    <div class="list-group-item">
        <div class="options-item">
            <div class="title-container">
                <h5 class="option-description">Australian Resident</h5>
                <small>
                Can be a resident for tax purposes without being a citizen or permanent resident or
                may have a visa to enter Australia, but are not a resident for tax purposes
                </small>
            </div>
            <div class="checkbox-input-group">
                <input type="checkbox" ?checked="${australiaOptions.isResident}" id="resident" class="switch" name="resident" />
            </div>
        </div>
    </div>
</div>
`;

export { AustraliaOptionsViewTemplate };
