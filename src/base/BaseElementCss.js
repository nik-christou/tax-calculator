import { css } from 'lit-element/lit-element.js';

export const BaseElementCss = css`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    :host {
        display: block;
        font-family: Roboto;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0.6em 0;
        font-weight: normal;
    }

    h1 {
        font-size: 2.625em;
        line-height: 1.2;
    }

    h2 {
        font-size: 1.625em;
        line-height: 1.2;
    }

    h3 {
        font-size: 1.3125em;
        line-height: 1.24;
    }

    h4 {
        font-size: 1.1875em;
        line-height: 1.23;
    }

    h5,
    h6 {
        font-size: 1em;
        font-weight: bold;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    th,
    td {
        text-align: left;
        vertical-align: top;
    }
`;
