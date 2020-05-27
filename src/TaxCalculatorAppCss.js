import { css } from "lit-element";

export const TaxCalculatorAppCss = css`

    :host {
        position: relative;
        width: 100vw;
        height: 100%;
    }

    #outlet {
        display: block;
        position: relative;
    }

    .snackbar-container {
        display: flex;
        background-color: lightpink;
        position: sticky;
        width: 100%;
        height: 50px;
        bottom: 0;
    }

    .home-leaving {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideOutRight;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutRight;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
        width: 100% !important;
        height: 100% !important;
    }

    .home-entering {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideInLeft;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideInLeft;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
        width: 100% !important;
        height: 100% !important;
    }

    .country-selection-leaving {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideOutLeft;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutLeft;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
        width: 100% !important;
        height: 100% !important;
    }

    .country-selection-entering {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideInRight;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideInRight;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
        width: 100% !important;
        height: 100% !important;
    }

    .results-leaving {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideOutLeft;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutLeft;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
        width: 100% !important;
        height: 100% !important;
    }

    .results-entering {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideInRight;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideInRight;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
        width: 100% !important;
        height: 100% !important;
    }

    .tax-details-leaving {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideOutLeft;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutLeft;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
        width: 100% !important;
        height: 100% !important;
    }

    .tax-details-entering {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideInRight;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideInRight;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
        width: 100% !important;
        height: 100% !important;
    }

    .tax-options-leaving {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideOutLeft;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutLeft;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
        width: 100% !important;
        height: 100% !important;
    }

    .tax-options-entering {
        -webkit-animation-delay: 0s;
        -webkit-animation-duration: 0.3s;
        -webkit-animation-name: slideInRight;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-delay: 0.01s;
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideInRight;
        animation-timing-function: ease-in-out;
        animation-delay: 0.01s;
        width: 100% !important;
        height: 100% !important;
    }

    @-webkit-keyframes slideOutLeft {
        0% {
            -webkit-transform: translate3d(0, 0, 0);
        }

        100% {
            visibility: hidden;
            -webkit-transform: translate3d(-100%, 0, 0);
        }
    }

    @keyframes slideOutLeft {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            transform: translate3d(-100%, 0, 0);
        }
    }

    @-webkit-keyframes slideOutRight {
        0% {
            -webkit-transform: translate3d(0, 0, 0);
        }

        100% {
            visibility: hidden;
            -webkit-transform: translate3d(100%, 0, 0);
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            transform: translate3d(100%, 0, 0);
        }
    }

    @-webkit-keyframes slideInLeft {
        0% {
            -webkit-transform: translate3d(-100%, 0, 0);
            visibility: visible;
        }

        100% {
            -webkit-transform: translate3d(0, 0, 0);
        }
    }

    @keyframes slideInLeft {
        from {
            transform: translate3d(-100%, 0, 0);
            visibility: visible;
        }

        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @-webkit-keyframes slideInRight {
        0% {
            -webkit-transform: translate3d(100%, 0, 0);
            visibility: visible;
        }

        100% {
            -webkit-transform: translate3d(0, 0, 0);
        }
    }

    @keyframes slideInRight {
        from {
            transform: translate3d(100%, 0, 0);
            visibility: visible;
        }

        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @-webkit-keyframes slideInDown {
        0% {
            -webkit-transform: translate3d(0, -100%, 0);
            visibility: visible;
        }

        100% {
            -webkit-transform: translate3d(0, 0, 0);
        }
    }

    @keyframes slideInDown {
        from {
            transform: translate3d(0, -100%, 0);
            visibility: visible;
        }

        to {
            transform: translate3d(0, 0, 0);
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

    @keyframes slideOutDown {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            transform: translate3d(0, 100%, 0);
        }
    }
`;
