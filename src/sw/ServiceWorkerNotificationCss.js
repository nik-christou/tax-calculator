import {css} from 'lit';

export const ServiceWorkerNotificationCss = css`

    :host {
        display: flex;
        height: auto;
        padding: 20px 10px;
        color: #fff;
        background-color: hsl(218, 52%, 30%);
    }

    .notification-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .info-container {
        display: flex;
        align-items: center;
    }

    .actions-container {
        display: flex;
        align-items: center;
    }

    .refresh-link {
        padding: 10px;
        color: white;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
    }

    .refresh-link:focus {
        outline: none;
        color: #535a60;
        background-color: #fafafb;
    }

    .refresh-link::-moz-focus-inner {
        border: 0;
    }

    [type=button]:not(:disabled),
    [type=reset]:not(:disabled),
    [type=submit]:not(:disabled),
    button:not(:disabled) {
        cursor: pointer;
    }

    @media (min-width: 1200px) {
        .close {
            font-size: 1.5rem;
        }
    }

    .close {
        font-size: calc(1.275rem + 0.3vw);
        font-weight: 700;
        line-height: 1;
        color: #fff;
        text-shadow: 0 1px 0 #fff;
    }

    .close-link {
        margin-left: 20px;
        padding: 10px;
        background-color: unset;
        border: unset;
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }

    .close-link:focus {
        color: #535a60;
        background-color: #fafafb;
    }
`;
