import { css } from "lit-element";

export const BaseElementCss = css`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    :host,
    :host::before,
    :host::after {
        box-sizing: border-box;
    }

    hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`;
