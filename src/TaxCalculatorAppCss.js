import { css } from "lit-element";

export const TaxCalculatorAppCss = css`

    #outlet {
        display: block !important;
        position: relative !important;
    }

    .home-leaving {
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutRight;
        animation-timing-function: ease-in-out;
        width: 100% !important;
        height: 100% !important;
    }

    .home-entering {
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideInLeft;
        animation-timing-function: ease-in-out;
        width: 100% !important;
        height: 100% !important;
    }

    .country-selection-leaving {
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutLeft;
        animation-timing-function: ease-in-out;
        width: 100% !important;
        height: 100% !important;
    }

    .country-selection-entering {
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideInRight;
        animation-timing-function: ease-in-out;
        width: 100% !important;
        height: 100% !important;
    }

    .results-leaving {
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutLeft;
        animation-timing-function: ease-in-out;
        width: 100% !important;
        height: 100% !important;
    }

    .results-entering {
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideInRight;
        animation-timing-function: ease-in-out;
        width: 100% !important;
        height: 100% !important;
    }

    .tax-details-leaving {
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideOutLeft;
        animation-timing-function: ease-in-out;
        width: 100% !important;
        height: 100% !important;
    }

    .tax-details-entering {
        animation-delay: 0s;
        animation-duration: 0.3s;
        animation-name: slideInRight;
        animation-timing-function: ease-in-out;
        width: 100% !important;
        height: 100% !important;
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

    @keyframes slideOutRight {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            transform: translate3d(100%, 0, 0);
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

    @keyframes slideInRight {
        from {
            transform: translate3d(100%, 0, 0);
            visibility: visible;
        }

        to {
            transform: translate3d(0, 0, 0);
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
