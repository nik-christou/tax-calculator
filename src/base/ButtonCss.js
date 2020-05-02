import { css } from "lit-element";

export const ButtonCss = css`

.btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
    .btn {
        transition: none;
    }
}

.btn:hover {
    color: #212529;
    text-decoration: none;
}

.btn:focus, .btn.focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn.disabled, .btn:disabled {
    opacity: 0.65;
}

a.btn.disabled,
fieldset:disabled a.btn {
    pointer-events: none;
}

.btn-primary {
    color: #fff;
    background-color: var(--btn-primary-background-color, #007bff);
    border-color: var(--btn-primary-border-color, #007bff);
}

.btn-primary:hover {
    color: #fff;
    background-color: var(--btn-primary-background-color-hover, #0069d9);
    border-color: var(--btn-primary-border-color-hover, #0062cc);
}

.btn-primary:focus, .btn-primary.focus {
    color: #fff;
    background-color: var(--btn-primary-background-color-focus, #0069d9);
    border-color: var(--btn-primary-border-color-focus, #0062cc);
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}

.btn-primary.disabled, .btn-primary:disabled {
    color: #fff;
    background-color: var(--btn-primary-background-color-disabled, #007bff);
    border-color: var(--btn-primary-border-color-disabled, #007bff);
}

.btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active,
.show > .btn-primary.dropdown-toggle {
    color: #fff;
    background-color: var(--btn-primary-background-color-active, #0062cc);
    border-color: var(--btn-primary-border-color-active, #005cbf);
}

.btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus,
.show > .btn-primary.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}

.btn-block {
    display: block;
    width: 100%;
}

.btn-block + .btn-block {
    margin-top: 0.5rem;
}
`;
