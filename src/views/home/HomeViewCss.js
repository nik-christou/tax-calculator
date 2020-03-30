import { css } from "lit-element";

export const HomeViewCss = css`

    .main-container {
        display: block;
        min-height: 100vh;
        width: 100%;
        padding-left: 1em;
        padding-right: 1em;
    }

    .logo {
        width: 100%;
        max-width: 24px;
        margin-right: 10px;
        float: left;
        border-style: none;
    }

    .title {
        display: flex;
        height: 100%;
        width: 100%;
        min-width: max-content;
        font-size: 1.4em;
        align-items: center;
        justify-content: center;
        color: #fff;
        line-height: 1.5;
        padding-top: 1em;
        padding-bottom: 1em;
        padding-left: 0.6em;
        padding-right: 1em;
        border-width: 0px;
        text-decoration: none;
    }

    .country-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .selected-country-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .selected-country-container img.right-chevron {
        height: 20px;
        margin-left: 20px;
    }

    .selected-country-container .country-info {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .selected-country-container .country-info img {
        height: 50px;
    }

    .selected-country-container .country-info .item-info {
        display: flex;
        margin-left: 10px;
        flex-direction: column;
    }

    .selected-country-container .country-info .item-info h5 {
        margin-top: 0;
    }

    .salary-type-container {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }

    .salary-type-container .salary-type-values {
        margin-top: 0;
    }

    .salary-input-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .salary-input-group {
        display: flex;
        flex-direction: column;
    }

    .salary-input-group .salary-input {
        width: auto;
    }

    .thirteen-input-group {
        display: flex;
        margin-top: 10px;
    }
`;
