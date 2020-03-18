import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../base/BaseElementMixin.js";
import { NavbarCss } from "./NavbarCss.js";

export class Navbar extends BaseElementMixin(LitElement) {

    static get styles() {
        return [...super.styles, NavbarCss];
    }

    render() {
        return html`
            <div class="navbar">
                <div class="title">
                    <a href="#" class="navbar-link">
                        <img src="/web_assets/img/logo.svg" alt="" class="logo" />
                        Salary Tax Calculator
                    </a>
                </div>
            </div>
        `;
    }
}

window.customElements.define("nav-bar", Navbar);
