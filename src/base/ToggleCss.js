import { css } from "lit-element";

export const ToggleCss = css`
    .toggle {
        display: none;
    }

    .toggle + label {
        display: block;
        position: relative;
        outline: none;
        user-select: none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    .toggle-round + label {
        padding: 2px;
        width: var(--toggle-round-label-width, 120px);
        height: var(--toggle-round-label-height, 60px);
        background-color: var(--toggle-round-label-background-color, #dddddd);
        border-radius: 60px;
    }

    .toggle-round + label:before,
    .toggle-round + label:after {
        display: block;
        position: absolute;
        top: 1px;
        left: 1px;
        bottom: 1px;
        content: "";
    }

    .toggle-round + label:before {
        right: 1px;
        background-color: var(--toggle-round-label-background-color-before, #f1f1f1);
        border-radius: 60px;
        transition: background 0.2s;
    }

    .toggle-round + label:after {
        width: var(--toggle-round-label-width-after, 58px);
        background-color: var(--toggle-round-label-background-color-after, #fff);
        border-radius: 100%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        transition: margin 0.2s;
    }

    .toggle-round:checked + label:before {
        background-color: var(--toggle-round-label-background-color-before-checked, #8ce196);
    }

    .toggle-round:checked + label:after {
        margin-left: var(--toggle-round-label-margin-left-after-checked, 60px);
    }
`;
