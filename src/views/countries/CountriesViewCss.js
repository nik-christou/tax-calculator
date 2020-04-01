import { css } from "lit-element";

export const CountriesViewCss = css`

    .main-container {
        display: block;
        min-height: 100vh;
        width: 100%;
        padding-left: 1em;
        padding-right: 1em;
    }

    .nav-back {
        display: flex;
        font-size: 1.4em;
        color: #fff;
        line-height: 1.5;
        padding-top: 1em;
        padding-bottom: 1em;
        padding-left: 1em;
        padding-right: 1em;
        text-decoration: none;
    }

    .nav-back .icon-chevron-left {
        width: 100%;
        height: 100%;
        max-width: 32px;
        fill: #fff;
    }

    .country-item {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }

    .item-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .country-info {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .country-info img {
        height: 50px;
    }

    .country-info .item-info {
        display: flex;
        margin-left: 10px;
        flex-direction: column;
    }

    .country-info .item-info h5 {
        margin-top: 0;
    }

    img.check {
        width: 25px;
        height: 25px;
    }
`;
