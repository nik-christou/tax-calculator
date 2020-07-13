import { LitElement, html } from "lit-element";
import { BaseElementMixin } from "../base/BaseElementMixin.js";
import { ServiceWorkerUpdateNotificationCss } from "./ServiceWorkerUpdateNotificationCss.js";

export class ServiceWorkerUpdateNotication extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
        }
    }

    static get styles() {
        return [...super.styles, ServiceWorkerUpdateNotificationCss];
    }

    render() {
        return html`
            <div class="notification-container">
                <div class="info-container">
                    <span>New version available</span>
                </div>
                <div class="actions-container">
                    <a href="#" class="refresh-link">Reload</a>
                    <button type="button" class="close close-link">
                        <span>&times;</span>
                    </button>
                </div>
            </div>
        `;
    }

    constructor() {
        super();
    }

    firstUpdated() {

        const refreshLink = this.shadowRoot.querySelector("a.refresh-link");
        const closeLink = this.shadowRoot.querySelector("button.close-link");

        refreshLink.addEventListener("click", event => this._handleRefreshLink(event));
        closeLink.addEventListener("click", event => this._handleCloseLink(event));
    }

    /**
     * @param {MouseEvent} event
     */
    _handleRefreshLink(event) {
        event.preventDefault();
        event.stopPropagation();
        
        window.location.reload();
    }

    /**
     * @param {MouseEvent} event
     */
    _handleCloseLink(event) {
        event.preventDefault();
        this.fireCloseNotificationEvent();
    }

    fireCloseNotificationEvent() {

        const closeNotificationEvent = new CustomEvent("hideNotificationEvent", {
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(closeNotificationEvent);
    }
}

// @ts-ignore
window.customElements.define("service-worker-update-notification", ServiceWorkerUpdateNotication);
