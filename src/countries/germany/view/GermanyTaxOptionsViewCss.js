import { css } from 'lit';

export const GermanyTaxOptionsViewCss = css`

    ul.marital-status-values,
    ul.parental-status-values {
        margin-top: 0;
        width: 100%;
        text-align: center;
    }

    ul.marital-status-values .list-group-item-action.active,
    ul.parental-status-values .list-group-item-action.active {
        background-color: #4e7ac7;
    }

    ul.marital-status-values .list-group-item,
    ul.parental-status-values .list-group-item {
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }

    ul.marital-status-values a#single-status,
    ul.parental-status-values a#children {
        border-bottom-left-radius: 1rem;
        border-top-left-radius: 1rem;
        padding: 0.6rem;
    }

    ul.marital-status-values a#married-status,
    ul.parental-status-values a#no-children {
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        padding: 0.6rem;
    }

    ul.parental-status-values .list-group-item-action {
        width: auto;
    }
`;