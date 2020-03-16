import { css } from "lit-element";

export const HomeViewCss = css`

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
`;
