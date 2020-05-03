import { css } from "lit-element";

export const ResultsViewCss = css`

:host {
    will-change: transform, opacity;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transform: translate3d(0,0,0);
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0,0,0);
}

.main-grid {
    background-color: #f2f2f2;
    min-height: 100vh;
}

.main-container {
    padding-top: 10px;
    padding-left: 1em;
    padding-right: 1em;
}

.nav-back {
    display: flex;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    font-size: 1.4em;
    color: #fff;
    line-height: 1.5;
    padding-top: 1em;
    padding-bottom: 1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    text-decoration: none;
}

.nav-back:focus {
    outline: none;
}

.nav-back .icon-chevron-left {
    width: 100%;
    height: 100%;
    max-width: 32px;
    fill: #fff;
}

.result-item-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
`;
