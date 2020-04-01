import { css } from "lit-element";

export const NavbarCss = css`

    :host {
        margin-bottom: 10px;
    }

    :host([sticky]) {
        position: fixed;
        z-index: 100;
        margin-bottom: 0px;
    }

    .navbar {
        line-height: 2.4em;
        overflow: hidden;
        background-color: #4e7ac7;
        color: #fff;
        margin-bottom: 0px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px;
    }

    .left {
        display: flex;
        grid-column: inherit;
    }

    .center {
        display: flex;
        grid-column: inherit;
    }
`;
