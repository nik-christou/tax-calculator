import { css } from "lit-element";

export const ListGroupCss = css`
    .list-group {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        padding-left: 0;
        margin-bottom: 0;
    }

    .list-group-item-action {
        width: 100%;
        color: #495057;
        text-align: inherit;
    }

    .list-group-item-action:hover,
    .list-group-item-action:focus {
        z-index: 1;
        color: #495057;
        text-decoration: none;
        background-color: #f8f9fa;
    }

    .list-group-item-action:active {
        color: #212529;
        background-color: #e9ecef;
    }

    .list-group-item {
        position: relative;
        display: block;
        padding: 0.75rem 1.25rem;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
    }

    .list-group-item:first-child {
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
    }

    .list-group-item:last-child {
        border-bottom-right-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
    }

    .list-group-item.disabled,
    .list-group-item:disabled {
        color: #6c757d;
        pointer-events: none;
        background-color: #fff;
    }

    .list-group-item.active {
        z-index: 2;
        color: #fff;
        background-color: var(--list-group-item-active-background-color, #007bff);
        border-color: var(--list-group-item-active-border-color, #007bff);
    }

    .list-group-item + .list-group-item {
        border-top-width: 0;
    }

    .list-group-item + .list-group-item.active {
        margin-top: -1px;
        border-top-width: 1px;
    }

    .list-group-horizontal {
        -ms-flex-direction: row;
        flex-direction: row;
    }

    .list-group-horizontal .list-group-item:first-child {
        border-bottom-left-radius: 0.25rem;
        border-top-right-radius: 0;
    }

    .list-group-horizontal .list-group-item:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-left-radius: 0;
    }

    .list-group-horizontal .list-group-item.active {
        margin-top: 0;
    }

    .list-group-horizontal .list-group-item + .list-group-item {
        border-top-width: 1px;
        border-left-width: 0;
    }

    .list-group-horizontal .list-group-item + .list-group-item.active {
        margin-left: -1px;
        border-left-width: 1px;
    }

    a.list-group-item {
        cursor: pointer;
    }

    .text-muted {
        color: #6c757d !important;
    }

    a {
        color: #007bff;
        text-decoration: none;
        background-color: transparent;
    }
`;
