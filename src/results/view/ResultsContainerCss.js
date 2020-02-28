import { css } from "lit-element";

export const ResultsContainerCss = css`

    :host {
        display: block;
    }

    /* mobile-first */
    .container {
        display: grid;
        grid-template-areas:
                "annual"
                "monthly";
        grid-template-columns: 1fr;
        grid-template-rows: 2fr;
        grid-row-gap: 50px;
    }

    annualContainer {
        grid-area: annual;
        display: block;
    }

    monthlyContainer {
        grid-area: monthly;
        display: block;
    }

    /* React to screens width more or equal to 768px */
    @media (min-width: 768px) {

        .container {
            grid-template-areas:"annual monthly";
            grid-template-columns: 2fr;
            grid-template-rows: 1fr;
        }
    }
`;
