import { html } from 'lit-element';

/**
 * @param {import('../../model/Country.js').Country} selectedCountry
 */
const taxOptionsTemplate = (selectedCountry) => {
    if (selectedCountry && selectedCountry.additionalOptions) {
        return html`
            <a href="/tax-options" class="list-group-item list-group-item-action">
                <div class="tax-options-container">
                    <h5>Additional options:</h5>
                    <div class="tax-options-container-img">
                        <img class="right-chevron" src="/web_assets/img/right-chevron.png" alt="" />
                    </div>
                </div>
            </a>
        `;
    }
    return html``;
};

/**
 * @param {import('../../model/Country.js').Country} selectedCountry
 */
const taxDetailsTemplate = (selectedCountry) => {
    if (selectedCountry) {
        return html`
            <a href="/tax-details" class="list-group-item list-group-item-action">
                <div class="tax-details-container">
                    <h5>Tax details:</h5>
                    <div class="tax-details-container-img">
                        <img class="right-chevron" src="/web_assets/img/right-chevron.png" alt="" />
                    </div>
                </div>
            </a>
        `;
    }
    return html``;
};

/**
 * @param {import('../../model/Country.js').Country} selectedCountry
 */
const countryInfoTemplate = (selectedCountry) => {
    if (selectedCountry) {
        return html`
            <div class="country-info">
                <div class="item-info">
                    <h5>${selectedCountry.name}</h5>
                    <small class="text-muted">${selectedCountry.currency} / ${selectedCountry.locale}</small>
                </div>
            </div>
        `;
    }

    return html`<h5>None</h5>`;
};

/**
 * @param {import('../../model/Country.js').Country} selectedCountry
 * @param {Boolean} includesThirteen
 * @param {String} grossAmount
 */
const HomeViewTemplate = (selectedCountry, includesThirteen, grossAmount) => html`
    <div bp="grid" class="grid-container">
        <main bp="12">
            <div bp="grid 12" class="navbar">
                <div class="title">
                    <img src="/web_assets/img/logo.svg" alt="" class="logo" />
                    Salary Tax Calculator
                </div>
            </div>
            <div class="main-container" bp="12">
                <div class="list-group">
                    <a href="/country-selection" class="list-group-item list-group-item-action">
                        <div class="country-container">
                            <h5>Country:</h5>
                            <div class="selected-country-container">
                                ${countryInfoTemplate(selectedCountry)}
                                <img class="right-chevron" src="/web_assets/img/right-chevron.png" alt="" />
                            </div>
                        </div>
                    </a>
                    ${taxDetailsTemplate(selectedCountry)} ${taxOptionsTemplate(selectedCountry)}
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
                                <input
                                    id="includesThirteen"
                                    type="checkbox"
                                    name="includesThirteen"
                                    ?checked="${includesThirteen}"
                                    class="toggle toggle-round"
                                />
                                <label for="includesThirteen"></label>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <button class="btn btn-primary btn-lg btn-block calculate-btn">Calculate</button>
                <br />
            </div>
        </main>
    </div>
`;

export { HomeViewTemplate };
