import { Workbox } from 'workbox-window';

export class ServiceWorkerRegistar {

    register() {

        if ('serviceWorker' in navigator) {
            return;
        }

        // path from baseUrl
        const wb = new Workbox('/service-worker.js');

        wb.addEventListener('activated', event => this._handleActivationState(event));
        wb.addEventListener('waiting', event => this._handleWaitingState(event));

        // Register the service worker after event listeners have been added.
        wb.register();
    }

    // _handleActivationState(event) {
        // console.log(event);
        // if (!event.isUpdate) {
        //     console.log('Service worker activated for the first time!');
        // }
    // }

    _handleWaitingState(event) {

        console.log(event);

        // alert component should provide a show/hide functions
        // to avoid the need to react on attributes changes
        const refreshAlertElement = this.shadowRoot.querySelector('bs-alert');
        refreshAlertElement.style.visibility = 'visible';
        refreshAlertElement.setAttribute('show', true);
    }
}
