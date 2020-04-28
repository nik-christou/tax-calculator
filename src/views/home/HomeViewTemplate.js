import { html } from "lit-element";
import { Country } from "../../model/Country.js";

/**
 * @param {Country} selectedCountry
 */
const countryOptionsTemplate = (selectedCountry) => {

    if(selectedCountry && selectedCountry.options) {
        return html`
            <a href="/country-options" class="list-group-item list-group-item-action">
                <div class="country-container">
                    <h5>Additional options:</h5>
                    <div class="selected-country-container">
                        <img class="right-chevron" src="/web_assets/img/right-chevron.png" alt="" />
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

    if(selectedCountry) {
        return html`
            <a href="/tax-details" class="list-group-item list-group-item-action">
                <div class="country-container">
                    <h5>Tax details:</h5>
                    <div class="selected-country-container">
                        <img class="right-chevron" src="/web_assets/img/right-chevron.png" alt="" />
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

    if(selectedCountry) {
        return html`
            <div class="country-info">
                <div class="item-info">
                    <h5>${selectedCountry.name}</h5>
                    <small class="text-muted">${selectedCountry.currency} / ${selectedCountry.locale}</small>
                </div>
            </div>
        `
    }

    return html`<h5>None</h5>`
};

/**
 * @param {Country} selectedCountry
 * @param {Boolean} includesThirteen
 * @param {Number} grossAmount
 */
const HomeViewTemplate = (selectedCountry, includesThirteen, grossAmount) => html`
<div bp="grid">
    <main bp="12">
        <nav-bar bp="12">
            <div slot="center" class="title">
                <img src="/web_assets/img/logo.svg" alt="" class="logo" />
                Salary Tax Calculator
            </div>
        </nav-bar>
        <div class="main-container">
            <h3>Location</h3>
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
                ${taxDetailsTemplate(selectedCountry)}
                ${countryOptionsTemplate(selectedCountry)}
            </div>
            <br />
            <h3>Salary</h3>
            <div class="list-group">
                <div class="list-group-item">
                    <div class="salary-input-container">
                        <h5>Amount:</h5>
                        <div class="salary-input-group">
                            <input type="number" id="grossAmountInput" .value=${grossAmount} min="0" class="form-control salary-input" placeholder="gross amount" />
                            <div class="thirteen-input-group">
                                <input type="checkbox" ?checked="${includesThirteen}" id="includesThirteen" class="switch" name="includesThirteen" />
                                <label for="includesThirteen">Includes 13th salary</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-group-item">
                    <div class="salary-type-container">
                        <h5>Period:</h5>
                        <ul class="list-group list-group-horizontal salary-type-values">
                            <a id="annual-salary-type" class="list-group-item list-group-item-action">Annual</a>
                            <a id="monthly-salary-type" class="list-group-item list-group-item-action">Monthly</a>
                        </ul>
                    </div>
                </div>
            </div>
            <br />
            <button class="btn btn-primary btn-lg btn-block calculate-btn">Calculate</button>
        </div>
    </main>
</div>
`;

export { HomeViewTemplate };
