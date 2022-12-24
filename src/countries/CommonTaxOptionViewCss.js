import {css} from 'lit';

export const CommonTaxOptionsViewCss = css`

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

  .options-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .options-item .title-container {
    display: flex;
    flex-direction: column;
  }

  .options-item .title-container h5 {
    margin-bottom: 0;
  }

  .options-item .checkbox-input-group {
    display: flex;
    padding-left: 20px;
  }
  
  .options-item .form-switch .form-check-input {
    height: 2em;
    width: 3.5em;
  }

  .options-item .form-switch .form-check-input:checked {
    background-color: hsl(218, 51.9%, 54.3%);
  }
`;
