import {css} from 'lit';

export const SnackbarNotificationCss = css`

    :host {
        position: fixed;
        width: 100%;
        opacity: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }

    :host([visible]) {
        opacity: 1;
    }

   :host(.notification-entering) {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideOutUp;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutUp;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
    }

    :host(.notification-leaving) {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideOutDown;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutDown;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
    }

    @keyframes slideOutUp {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            transform: translate3d(0, -100%, 0);
        }
      }

    @-webkit-keyframes slideOutUp {
        0% {
            -webkit-transform: translate3d(0, 0, 0);
        }

        100% {
            visibility: hidden;
            -webkit-transform: translate3d(0, -100%, 0);
        }
    }

    @keyframes slideOutDown {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            transform: translate3d(0, 100%, 0);
        }
    }

    @-webkit-keyframes slideOutDown {
        0% {
            -webkit-transform: translate3d(0, 0, 0);
        }

        100% {
            visibility: hidden;
            -webkit-transform: translate3d(0, 100%, 0);
        }
    }
`;
