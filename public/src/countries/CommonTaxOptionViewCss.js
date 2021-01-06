import { css } from 'lit-element';

export const CommonTaxOptionsViewCss = css`

    .list-group-item:first-child {
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
    }

    .list-group-item:last-child {
        border-bottom-right-radius: 1rem;
        border-bottom-left-radius: 1rem;
    }

    .options-item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        --toggle-round-label-width: 65px;
        --toggle-round-label-height: 35px;
        --toggle-round-label-background-color: #dddddd;
        --toggle-round-label-background-color-before: #f1f1f1;
        --toggle-round-label-background-color-before-checked: #4e7ac7;
        --toggle-round-label-width-after: 33px;
        --toggle-round-label-background-color-after: #ffffff;
        --toggle-round-label-margin-left-after-checked: 30px;
    }

    .options-item .title-container {
        display: flex;
        flex-direction: column;
    }

    .options-item .checkbox-input-group {
        display: flex;
        padding-left: 20px;
    }
`;
