import {css} from 'lit';

export const HomeViewCss = css`
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

  .grid-container {
    min-width: 100vw;
    min-height: 100vh;
  }

  .navbar {
    line-height: 2.4em;
    overflow: hidden;
    background-color: hsl(218, 52%, 54%);
    color: #fff;
    margin-bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px;
    padding: 0.7em 0.5em;
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

  main {
    background-color: #f2f2f2;
  }

  .main-container {
    padding-top: 10px;
    padding-left: 1em;
    padding-right: 1em;
  }

  .logo {
    width: 100%;
    max-width: 24px;
    margin-right: 10px;
    float: left;
    border-style: none;
  }

  .list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }

  .list-group-item-action:hover {
    cursor: pointer;
  }

  .list-group-item:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  .list-group-item:last-child {
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  .list-group-item.list-group-item-action {
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .country-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .country-container h5 {
    margin-bottom: 0;
  }

  .selected-country-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .selected-country-container img.right-chevron {
    height: 20px;
    margin-left: 20px;
  }

  .selected-country-container .country-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .selected-country-container .country-info img {
    height: 50px;
  }

  .selected-country-container .country-info .item-info {
    display: flex;
    margin-left: 10px;
    flex-direction: column;
  }

  .thirteen-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .thirteen-container h5 {
    margin-bottom: 0;
  }

  .thirteen-container .form-switch .form-check-input {
    height: 2em;
    width: 3.5em;
  }

  .thirteen-container .form-switch .form-check-input:checked {
    background-color: hsl(218, 51.9%, 54.3%);
  }

  .salary-type-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .salary-type-container .list-group-item.active {
    --bs-list-group-active-color: white;
    --bs-list-group-active-bg: hsl(218, 51.9%, 54.3%);
    --bs-list-group-active-border-color: hsl(218, 51.9%, 54.3%);
  }

  .salary-type-container .salary-type-values {
    margin-top: 0;
    width: 100%;
    text-align: center;
  }

  .salary-type-container .item-label {
    margin-right: 20px;
    margin-bottom: 0;
  }

  .salary-type-container .salary-type-values .list-group-item {
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .salary-type-container .salary-type-values #annual-salary-type {
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
    padding: 0.6rem;
  }

  .salary-type-container .salary-type-values #monthly-salary-type {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    padding: 0.6rem;
  }

  .salary-input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .salary-input-container .item-label {
    margin-right: 20px;
    margin-bottom: 0;
  }

  .salary-input-container .salary-input {
    width: 100%;
    border-radius: 1rem;
  }

  .salary-input-container .salary-input:invalid {
    box-shadow: none;
    -moz-box-shadow: none;
  }

  .salary-input-container .salary-input:focus {
    outline: none;
    box-shadow: 0 0 3pt 2pt #4e7ac7;
  }

  .options-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .options-item .resident-input-group {
    display: flex;
    margin-top: 10px;
  }

  .tax-details-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tax-details-container h5 {
    margin-bottom: 0;
  }

  .tax-details-container .tax-details-container-img {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tax-details-container .tax-details-container-img img.right-chevron {
    height: 20px;
    margin-left: 20px;
  }

  .tax-options-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tax-options-container h5 {
    margin-bottom: 0;
  }

  .tax-options-container .tax-options-container-img {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tax-options-container .tax-options-container-img img.right-chevron {
    height: 20px;
    margin-left: 20px;
  }

  .calculate-btn-container {
    display: grid;
  }

  .calculate-btn-container .calculate-btn {
    --bs-btn-border-radius: 1em;
    --bs-btn-bg: hsl(218, 51.9%, 54.3%);
    --bs-btn-color: white;
    --bs-btn-border-color: hsl(218, 51.9%, 54.3%);
    --bs-btn-hover-bg: hsl(218, 51.9%, 45%);
    --bs-btn-hover-color: white;
    --bs-btn-hover-border-color: hsl(218, 51.9%, 45%);
    --bs-btn-disabled-bg: hsl(216, 98%, 52%);
    --bs-btn-disabled-color: white;
    --bs-btn-active-bg: hsl(218, 51.9%, 45%);
    --bs-btn-active-color: white;
    --bs-btn-active-border-color: hsl(218, 51.9%, 45%);
  }
`;
