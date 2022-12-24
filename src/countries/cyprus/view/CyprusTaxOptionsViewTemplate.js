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
                    <div class="form-check form-switch">
                        <input
                            id="employmentTypeStatus" 
                            name="employmentTypeStatus" 
                            class="form-check-input"
                            ?checked=${employmentStatus}
                            type="checkbox" 
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export { CyprusTaxOptionsViewTemplate };
