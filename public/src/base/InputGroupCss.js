import { css } from 'lit-element';

export const InputGroupCss = css`
    .input-group {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        width: 100%;
    }

    .input-group-append,
    .input-group-prepend {
        display: flex;
    }

    .input-group-prepend {
        margin-right: -1px;
    }

    .input-group > .form-control:not(:first-child) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .input-group > .form-control,
    .input-group > .form-control-plaintext {
        position: relative;
        flex: 1 1 0%;
        min-width: 0;
        margin-bottom: 0;
    }

    .input-group > .input-group-prepend > .input-group-text {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .input-group-text {
        display: flex;
        align-items: center;
        padding: 0.375rem 0.75rem;
        margin-bottom: 0;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        text-align: center;
        white-space: nowrap;
        background-color: #e9ecef;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
    }

    .form-control {
        display: block;
        width: 100%;
        height: calc(1.5em + 0.75rem + 2px);
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    input {
        margin: 0;
        overflow: visible;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }
`;
