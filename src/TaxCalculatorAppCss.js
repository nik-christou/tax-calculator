import {css} from 'lit';

export const TaxCalculatorAppCss = css`

  :host {
    position: relative;
    min-width: 100vw;
    height: 100%;
  }

  .main {
    min-height: 100vh;
  }

  #outlet {
    display: block;
    position: relative;
    min-height: 100vh;
  }

  .home-leaving {
    -webkit-animation-delay: 0.01s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideOutRight;
    -webkit-animation-timing-function: ease-in-out;
    animation-delay: 0.01s;
    animation-duration: 0.3s;
    animation-name: slideOutRight;
    animation-timing-function: ease-in-out;
  }

  .home-entering {
    visibility: hidden;
    -webkit-animation-delay: 0.01s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideInLeft;
    -webkit-animation-timing-function: ease-in-out;
    animation-delay: 0.01s;
    animation-duration: 0.3s;
    animation-name: slideInLeft;
    animation-timing-function: ease-in-out;
  }

  .country-selection-leaving {
    -webkit-animation-delay: 0.01s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideOutLeft;
    -webkit-animation-timing-function: ease-in-out;
    animation-delay: 0.01s;
    animation-duration: 0.3s;
    animation-name: slideOutLeft;
    animation-timing-function: ease-in-out;
  }

  .country-selection-entering {
    visibility: hidden;
    -webkit-animation-delay: 0.01s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideInRight;
    -webkit-animation-timing-function: ease-in-out;
    animation-delay: 0.01s;
    animation-duration: 0.3s;
    animation-name: slideInRight;
    animation-timing-function: ease-in-out;
  }

  .results-leaving {
    -webkit-animation-delay: 0.01s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideOutLeft;
    -webkit-animation-timing-function: ease-in-out;
    animation-delay: 0.01s;
    animation-duration: 0.3s;
    animation-name: slideOutLeft;
    animation-timing-function: ease-in-out;
  }

  .results-entering {
    visibility: hidden;
    -webkit-animation-delay: 0.01s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideInRight;
    -webkit-animation-timing-function: ease-in-out;
    animation-delay: 0.01s;
    animation-duration: 0.3s;
    animation-name: slideInRight;
    animation-timing-function: ease-in-out;
  }

  .tax-details-leaving {
    -webkit-animation-delay: 0.01s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideOutLeft;
    -webkit-animation-timing-function: ease-in-out;
    animation-delay: 0.01s;
    animation-duration: 0.3s;
    animation-name: slideOutLeft;
    animation-timing-function: ease-in-out;
  }

  .tax-details-entering {
    visibility: hidden;
    -webkit-animation-delay: 0.01s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideInRight;
    -webkit-animation-timing-function: ease-in-out;
    animation-delay: 0.01s;
    animation-duration: 0.3s;
    animation-name: slideInRight;
    animation-timing-function: ease-in-out;
  }

  .tax-options-leaving {
    -webkit-animation-delay: 0.01s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideOutLeft;
    -webkit-animation-timing-function: ease-in-out;
    animation-delay: 0.01s;
    animation-duration: 0.3s;
    animation-name: slideOutLeft;
    animation-timing-function: ease-in-out;
  }

  .tax-options-entering {
    visibility: hidden;
    -webkit-animation-delay: 0.01s;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-name: slideInRight;
    -webkit-animation-timing-function: ease-in-out;
    animation-delay: 0.01s;
    animation-duration: 0.3s;
    animation-name: slideInRight;
    animation-timing-function: ease-in-out;
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
