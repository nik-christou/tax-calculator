import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../base/BaseElementMixin.js";
import { NavbarCss } from "./NavbarCss.js";
import { BlueprintCss } from "../base/BlueprintCss.js";

export class Navbar extends BaseElementMixin(LitElement) {

    static get styles() {
        return [...super.styles, BlueprintCss, NavbarCss];
    }

    render() {
        return html`
            <div class="navbar">
                <div class="left">
                    <slot name="left"></slot>
                </div>
                <div class="center">
                    <slot name="center"></slot>
                </div>
            </div>
        `;
    }
}

window.customElements.define("nav-bar", Navbar);
