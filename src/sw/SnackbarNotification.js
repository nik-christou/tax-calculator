import {LitElement, html} from 'lit';
import {BaseElementMixin} from '../base/BaseElementMixin.js';
import {SnackbarNotificationCss} from './SnackbarNotificationCss.js';

export class SnackbarNotification extends BaseElementMixin(LitElement) {

    static get properties() {
        return {
            visible: { type: Boolean, reflect: true }
        };
    }

    static get styles() {
        return [...super.styles, SnackbarNotificationCss];
    }

    render() {
        return html`
            <div>
                <slot></slot>
            </div>
        `;
    }

    constructor() {
        super();
        this.visible = false;
    }

    firstUpdated() {
        this.addEventListener('hideNotificationEvent', _ => this.hide());
        this.addEventListener('showNotificationEvent', _ => this.show());

        if (this.visible) {
            window.requestAnimationFrame(() => this.show());
        }
    }

    /**
     * Shows the service worker notification.
     *
     * @returns {Promise} which is resolved when the animation ends
     */
    show() {
        const hostElement = this.shadowRoot.host;
        const showAnimationCssClassName = 'notification-entering';
        const visibleCssClassName = 'visible';

        hostElement.classList.add(showAnimationCssClassName);
        hostElement.style.opacity = '1';
        this._resetHeightAndPosition(hostElement);

        return new Promise(resolve => {

            this._waitForAnimation(hostElement, () => {
                hostElement.classList.remove(showAnimationCssClassName);
                hostElement.setAttribute(visibleCssClassName, '');
                hostElement.style.bottom = '0';
                resolve();
            });
        });
    }

    /**
     * Hides the service worker notification.
     *
     * @returns {Promise} which is resolved when the animation ends
     */
    hide() {
        const hostElement = this.shadowRoot.host;
        const hideAnimationCssClassName = 'notification-leaving';
        const visibleCssClassName = 'visible';

        hostElement.classList.add(hideAnimationCssClassName);

        return new Promise(resolve => {

            this._waitForAnimation(hostElement, () => {
                hostElement.classList.remove(hideAnimationCssClassName);
                hostElement.removeAttribute(visibleCssClassName);
                this._resetHeightAndPosition(hostElement);
                hostElement.style.opacity = '0';
                resolve();
            });
        });
    }

    /**
     * @param {HTMLElement} element
     * @param {Function} callback
     */
    _waitForAnimation(element, callback) {

        const animationEndEvent = 'animationend';

        const listener = () => {
            element.removeEventListener(animationEndEvent, listener);
            callback();
        };

        element.addEventListener(animationEndEvent, listener);
    }

    /**
     * @param {HTMLElement} element
     */
    _resetHeightAndPosition(element) {
        const slottedItemsHeight = this._getSlottedElementsHeight();
        element.style.height = `${slottedItemsHeight}px`;
        element.style.bottom = `-${slottedItemsHeight}px`;
    }

    _getSlottedElementsHeight() {

        const slotNode = this.shadowRoot.querySelector('slot');
        const slottedElements = slotNode.assignedNodes();

        let totalHeight = 0;

        for (let index = 0; index < slottedElements.length; index++) {

            const slotElement = slottedElements[index];

            if (slotElement.nodeType === window.Node.ELEMENT_NODE) {

                const slotElementHeight = slotElement.offsetHeight;

                const marginTopValue = window.getComputedStyle(slotElement).marginTop;
                const marginBottomValue = window.getComputedStyle(slotElement).marginBottom;

                // remove px suffix - just extract the number
                const marginTop = Number(marginTopValue.slice(0, marginTopValue.length-2));
                const marginBottom = Number(marginBottomValue.slice(0, marginBottomValue.length-2));

                totalHeight += (slotElementHeight + marginTop + marginBottom);
            }
        }

        return totalHeight;
    }
}
