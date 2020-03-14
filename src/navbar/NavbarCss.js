import { css } from "lit-element";

export const NavbarCss = css`

    :host([sticky]) {
        position: fixed;
        z-index: 100;
        margin-bottom: 0px;
    }

    .navbar {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
        line-height: 2.4em;
        overflow: hidden;
        background-color: var(--navbar-background-color, #4e7ac7);
        color: var(--navbar-color, #fff);
        margin-bottom: var(--navbar-margin-bottom, 0px);
        box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px;
    }

    .navbar-link {
        display: flex;
        width: 300px;
        font-size: 1.4em;
        align-items: center;
        height: 100%;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
        line-height: 1.5 !important;
        padding-top: 1em;
        padding-bottom: 1em;
        padding-left: 0.6em;
        padding-right: 1em;
        border-width: 0px;
        border-style: initial;
        border-color: initial;
        border-image: initial;
        text-decoration: none;
    }

    .navbar-link:hover {
        background-color: #3661ac;
    }

    .logo {
        width: 100%;
        max-width: 24px;
        margin-right: 10px;
        float: left;
        border-style: none;
    }

    /* this needs to be on a link
    .navbar:hover {
        background-color: var(--navbar-hover-background-color, #3661ac);
    }
    */
`;
