import { html } from 'lit';

/**
 * @param {Country} selectedCountry
 */
const taxOptionsTemplate = (selectedCountry) => {
    if (selectedCountry && selectedCountry.additionalOptions) {
        return html`
            <a id="taxOptionsLink" class="list-group-item list-group-item-action">
                <div class="tax-options-container">
                    <h5>Additional options:</h5>
                    <div class="tax-options-container-img">
                        <img class="right-chevron" src="/img/right-chevron.png" alt="" />
                    </div>
                </div>
            </a>
        `;
    }
    return html``;
};

/**
 * @param {Country} selectedCountry
 */
const taxDetailsTemplate = (selectedCountry) => {
    if (selectedCountry) {
        return html`
            <a id="taxDetailsLink" class="list-group-item list-group-item-action">
                <div class="tax-details-container">
                    <h5>Tax details:</h5>
                    <div class="tax-details-container-img">
                        <img class="right-chevron" src="/img/right-chevron.png" alt="" />
                    </div>
                </div>
            </a>
        `;
    }
    return html``;
};

/**
 * @param {Country} selectedCountry
 */
const countryInfoTemplate = (selectedCountry) => {
    if (selectedCountry) {
        return html`
            <div class="country-info">
                <div class="item-info">
                    <h5>${selectedCountry.name}</h5>
                </div>
            </div>
        `;
    }

    return html`<h5>None</h5>`;
};

/**
 * @param {Country} selectedCountry
 * @param {Boolean} includesThirteen
 * @param {String} grossAmount
 */
const HomeViewTemplate = (selectedCountry, includesThirteen, grossAmount) => html`
    <div bp="grid" class="grid-container">
        <main bp="12">
            <div bp="grid 12" class="navbar">
                <div class="title">
                    <img src="/img/logo.svg" alt="" class="logo" />
                    Salary Tax Calculator
                </div>
            </div>
            <div class="main-container" bp="12">
                <div class="list-group">
                    <a id="countrySelectionLink" class="list-group-item list-group-item-action">
                        <div class="country-container">
                            <h5>Country:</h5>
                            <div class="selected-country-container">
                                ${countryInfoTemplate(selectedCountry)}
                                <img class="right-chevron" src="/img/right-chevron.png" alt="" />
                            </div>
                        </div>
                    </a>
                    ${taxDetailsTemplate(selectedCountry)} 
                    ${taxOptionsTemplate(selectedCountry)}
                </div>
                <br />

                <div class="list-group">
                    <div class="list-group-item">
                        <div class="salary-input-container">
                            <h5 class="item-label">Salary:</h5>
                            <input
                                inputmode="numeric"
                                pattern="[0-9]*"
                                type="text"
                                id="grossAmountInput"
                                .value=${grossAmount}
                                class="form-control salary-input"
                                placeholder="enter gross amount"
                                novalidate
                            />
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="salary-type-container">
                            <h5 class="item-label">Period:</h5>
                            <ul class="list-group list-group-horizontal salary-type-values">
                                <a id="annual-salary-type" class="list-group-item list-group-item-action">Annual</a>
                                <a id="monthly-salary-type" class="list-group-item list-group-item-action">Monthly</a>
                            </ul>
                        </div>
                    </div>
                    <div class="list-group-item">
                        <div class="thirteen-container">
                            <h5 class="item-label">Includes 13th:</h5>
                            <div>
                                <div class="form-check form-switch">
                                    <input
                                        id="includesThirteen"
                                        name="employmentTypeStatus"
                                        class="form-check-input"
                                        ?checked=${includesThirteen}
                                        type="checkbox"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="calculate-btn-container">
                    <button class="btn btn-lg calculate-btn">Calculate</button>
                </div>
                <br />
            </div>
        </main>
    </div>
`;

export { HomeViewTemplate };
