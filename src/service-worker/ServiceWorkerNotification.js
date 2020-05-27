import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../base/BaseElementMixin.js";
import { ServiceWorkerNotificationCss } from "./ServiceWorkerNotificationCss.js";

export class ServiceWorkerNotication extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            visible: Boolean
        }
    }

    static get styles() {
        return [...super.styles, ServiceWorkerNotificationCss];
    }

    render() {
        return html`
            <div class="snackbar-container">
                <span>snackbar</span>
            </div>
        `;
    }

    constructor() {
        super();
        this.visible = false;
    }

    firstUpdated() {
    }

    show() {
        this.shadowRoot.host.setAttribute("visible", "");
    }

    hide() {
        this.shadowRoot.host.removeAttribute("visible");
    }
}

// @ts-ignore
window.customElements.define("service-worker-notification", ServiceWorkerNotication);
