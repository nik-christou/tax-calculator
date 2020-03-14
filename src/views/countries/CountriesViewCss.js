import { css } from "lit-element";

export const CountriesViewCss = css`

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
