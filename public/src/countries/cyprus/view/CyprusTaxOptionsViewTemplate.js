import { html } from 'lit-element';

/**
 * @param {import('../model/CyprusTaxOptions.js').CyprusTaxOptions} cyprusTaxOptions
 */
const CyprusTaxOptionsViewTemplate = (cyprusTaxOptions) => html`
    <div class="list-group">
        <div class="list-group-item">
            <div class="options-item">
                <div class="title-container">
                    <h5 class="option-description">Self-employed</h5>
                </div>
                <div>
                    <input
                        id="selfEmployed"
                        type="checkbox"
                        name="selfEmployed"
                        ?checked="${cyprusTaxOptions.selfEmployed}"
                        class="toggle toggle-round cmn-toggle cmn-toggle-round"
                    />
                    <label for="selfEmployed"></label>
                </div>
            </div>
        </div>
    </div>
`;

export { CyprusTaxOptionsViewTemplate };
