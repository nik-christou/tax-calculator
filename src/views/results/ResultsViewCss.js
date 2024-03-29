import {css} from 'lit';

export const ResultsViewCss = css`
  :host {
    min-height: 100vh;
    min-width: 100vw;
    will-change: transform, opacity;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
  }

  .main-grid {
    background-color: #f2f2f2;
    min-height: 100vh;
  }

  .navbar {
    line-height: 2.4em;
    overflow: hidden;
    background-color: #4e7ac7;
    color: #fff;
    margin-bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px;
    padding-top: 0.7em;
    padding-bottom: 0.7em;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  .navbar .nav-back {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    font-size: 1.4em;
    color: hsla(240, 100%, 100%, 0.7);
    line-height: 1.5;
    text-decoration: none;
  }

  .navbar .nav-back:focus {
    outline: none;
  }

  .navbar .nav-back .icon-chevron-left {
    max-height: 32px;
    max-width: 25px;
    fill: hsla(240, 100%, 100%, 0.7);
  }

  .navbar .title {
    display: flex;
    height: 100%;
    width: 100%;
    min-width: max-content;
    font-size: 1.4em;
    align-items: center;
    justify-content: center;
    color: #fff;
    line-height: 1.5;
    border-width: 0px;
    text-decoration: none;
  }

  .navbar .share-container {
    display: flex;
    align-items: center;
    padding-right: 10px;
    justify-content: right;
  }

  .navbar .share-container a {
    --bs-link-color: white;
    text-decoration: underline;
  }

  .navbar .share-container a:hover {
    --bs-link-hover-color: white;
  }

  .main-container {
    padding-top: 10px;
    padding-left: 1em;
    padding-right: 1em;
  }

  .list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }

  .list-group-item:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  .list-group-item:last-child {
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  .result-item-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .result-item-container h5 {
    margin-bottom: 0;
  }

  .result-item-container span.deduction {
    color: red;
  }

  .result-item-container span.netResult {
    color: green;
  }

  .tax-breakdown-item-container {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
  }

  .tax-breakdown-item-container .tax-breakdown-rate {
    display: flex;
    justify-content: center;
  }

  .tax-breakdown-item-container .tax-breakdown-amount {
    display: flex;
    justify-content: right;
  }
`;
