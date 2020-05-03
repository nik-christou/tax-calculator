import { html } from "lit-element";
import { Country } from "../../model/Country.js";

/**
 * @param {Number} selectedId
 * @param {Number} countryId
 */
function isSelectedCountry(selectedId, countryId) {

    if(selectedId === countryId) {
        return html`
            <img class="check" src="/web_assets/img/check.png" alt="" />
        `;
    }
}

/**
 * @param {Country} country
 * @param {Number} selectedId
 * @param {Function} handleSelectedCountry
 */
const countryItemTemplate = (country, selectedId, handleSelectedCountry) => html`
<a @click=${event => handleSelectedCountry(event, country)} class="list-group-item list-group-item-action country-item">
    <div class="item-container">
        <div class="country-info">
            <img src="/web_assets/data/${country.flag}" alt="" />
            <div class="item-info">
                <h5>${country.name}</h5>
                <small class="text-muted">${country.currency} / ${country.locale}</small>
            </div>
        </div>
        ${isSelectedCountry(selectedId, country.id)}
    </div>
</a>
`;

/**
 * @param {Array<Country>} countries
 * @param {Number} selectedId
 * @param {Function} handleSelectedCountry
 */
const CountrySelectionViewTemplate = (countries, selectedId, handleSelectedCountry) => html`
<div bp="grid">
    <main bp="12">
        <nav-bar bp="12">
            <a href="#" slot="left" class="nav-back">
                <svg viewBox="0 0 32 32" class="icon icon-chevron-left" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z"/>
                </svg>
                Home
            </a>
        </nav-bar>
        <div class="main-container" bp="12">
            <div class="list-group">
                ${countries.map((country) => html`${countryItemTemplate(country, selectedId, handleSelectedCountry)}`)}
            </div>
        </div>
    </main>
</div>
`;

export { CountrySelectionViewTemplate };
