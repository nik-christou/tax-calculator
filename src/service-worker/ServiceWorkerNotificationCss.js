import { css } from "lit-element";

export const ServiceWorkerNotificationCss = css`

    :host {
        display: none;
        background-color: lightpink;
        position: sticky;
        width: 100%;
        height: 50px;
        bottom: 0;
    }

    :host([visible]) {
        display: flex;
    }
`;
