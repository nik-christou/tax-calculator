import {LitElement, html} from 'lit';
import {BaseElementMixin} from '../base/BaseElementMixin.js';
import {SWUpdateNotificationCss} from './SWUpdateNotificationCss.js';

export class SWUpdateNotification extends BaseElementMixin(LitElement) {

    static get styles() {
        return [...super.styles, SWUpdateNotificationCss];
    }

    render() {
        return html`
            <div class="notification-container">
                <div class="info-container">
                    <span>New version available</span>
                </div>
                <div class="actions-container">
                    <a id="refreshButton" href="#" class="refresh-link">Reload</a>
                    <button type="button" class="close close-link">
                        <span>&times;</span>
                    </button>
                </div>
            </div>
        `;
    }

    firstUpdated() {
        const refreshLink = this.shadowRoot.querySelector('a#refreshButton');
        const closeLink = this.shadowRoot.querySelector('button.close-link');
        refreshLink.addEventListener('click', event => this.#handleRefreshLink(event));
        closeLink.addEventListener('click', event => this.#handleCloseLink(event));
    }

    /**
     * @param {MouseEvent} event
     */
    #handleRefreshLink(event) {
        event.preventDefault();
        event.stopPropagation();
        this.#fireRefreshNotificationEvent();
    }

    /**
     * @param {MouseEvent} event
     */
    #handleCloseLink(event) {
        event.preventDefault();
        event.stopPropagation();
        this.#fireCloseNotificationEvent();
    }

    #fireRefreshNotificationEvent() {
        const refreshNotificationEvent = new window.CustomEvent('refreshNotificationEvent', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(refreshNotificationEvent);
    }

    /**
     * Fire the necessary event to close the notification component
     */
    #fireCloseNotificationEvent() {
        const closeNotificationEvent = new window.CustomEvent('hideNotificationEvent', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(closeNotificationEvent);
    }
}
