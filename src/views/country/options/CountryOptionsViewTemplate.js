import { html } from "lit-element";
import { Country } from "../../../model/Country.js";
import { CountryOptionsViewTemplateLoader } from "./CountryOptionsViewTemplateLoader.js";

/**
 * @param {Country} country
 */
const CountryOptionsViewTemplate = (country) => html`
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
        <div class="main-container">
            ${CountryOptionsViewTemplateLoader.getCountryOptionsViewTemplate(country)}
        </div>
    </main>
</div>
`;

export { CountryOptionsViewTemplate };
