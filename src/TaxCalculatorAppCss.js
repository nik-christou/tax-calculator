import { css } from "lit-element";

export const TaxCalculatorAppCss = css`

    :host {
        display: block;
        font-family: Roboto;
        font-size: 1.5rem;
    }

    /* mobile-first */
    .container {
        display: grid;
        grid-template-areas:
            "header"
            "main";
        grid-template-columns: 1fr;
        grid-template-rows: 50px 1fr;
        height: 100vh;
    }

    header {
        grid-area: header;
        display: block;
    }

    main {
        grid-area: main;
        display: block;
    }

    /* React to screens width more or equal to 768px */
    @media (min-width: 768px) {

        .container {
            grid-template-columns: 1fr;
            grid-template-areas:
                "header"
                "main";
        }
    }

    .headerContainer {
        display: flex;
        height: 50px;
        padding: 1rem 1rem;
        background-color: #7994B9;
    }

    #title {
        color: white;
    }
`;
