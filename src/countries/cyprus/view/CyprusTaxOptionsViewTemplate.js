import { html } from 'lit';

/**
 * @param {Boolean} employmentStatus
 */
const CyprusTaxOptionsViewTemplate = (employmentStatus) => html`
    <div class="list-group">
        <div class="list-group-item">
            <div class="options-item">
                <div class="title-container">
                    <h5 class="option-description">Self-employed</h5>
                </div>
                <div>
                    <input
                        id="employmentTypeStatus"
                        type="checkbox"
                        name="employmentTypeStatus"
                        ?checked=${employmentStatus}
                        class="toggle toggle-round cmn-toggle cmn-toggle-round"
                    />
                    <label for="employmentTypeStatus"></label>
                </div>
            </div>
        </div>
    </div>
`;

export { CyprusTaxOptionsViewTemplate };
