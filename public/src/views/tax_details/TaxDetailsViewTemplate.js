import { html } from 'lit-html';

/**
 * @param {import('lit-element').TemplateResult} countryTaxDetailsView
 */
const TaxDetailsViewTemplate = (countryTaxDetailsView) => html`
    <div bp="grid" class="main-grid">
        <main bp="12">
            <div bp="grid 4" class="navbar">
                <a class="nav-back">
                    <svg class="icon-chevron-left">
                        <path d="M14.19 16.005l7.869 7.868-2.129 2.129-9.996-9.997L19.937 6.002l2.127 2.129z" />
                    </svg>
                    Home
                </a>
                <div class="title">
                    Tax details
                </div>
            </div>
            <div class="main-container" bp="12">
                ${countryTaxDetailsView}
            </div>
            <br />
        </main>
    </div>
`;

export { TaxDetailsViewTemplate };
