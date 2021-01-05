import { html } from 'lit-element';

/**
 * @param {import('../model/GermanTaxOptions.js').GermanTaxOptions} germanTaxOptions
 */
const GermanTaxOptionsViewTemplate = (germanTaxOptions) => html`
    <div class="list-group">
        <div class="list-group-item">
            <div class="options-item">
                <div class="title-container">
                    <h5 class="option-description">Single</h5>
                    <small>
                        Marital status (single or married)
                    </small>
                </div>
                <div>
                    <input
                        id="single"
                        type="checkbox"
                        name="single"
                        ?checked="${germanTaxOptions.single}"
                        class="toggle toggle-round cmn-toggle cmn-toggle-round"
                    />
                    <label for="single"></label>
                </div>
            </div>
        </div>
        <div class="list-group-item">
            <div class="options-item">
                <div class="title-container">
                    <h5 class="option-description">With child</h5>
                    <small>
                        Parental status (with child/children or not)
                    </small>
                </div>
                <div>
                    <input
                        id="withChild"
                        type="checkbox"
                        name="withChild"
                        ?checked="${germanTaxOptions.withChild}"
                        class="toggle toggle-round cmn-toggle cmn-toggle-round"
                    />
                    <label for="withChild"></label>
                </div>
            </div>
        </div>
    </div>
`;

export { GermanTaxOptionsViewTemplate };
