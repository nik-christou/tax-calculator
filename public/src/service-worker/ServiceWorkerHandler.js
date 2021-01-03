import { Workbox, messageSW } from 'workbox-window';

const serviceWorkerLocation = '../service-worker.js';

export class ServiceWorkerHandler {

    /**
     * @param {import('../component/snackbar/SnackbarNotification.js').SnackbarNotication} snackbarNotication
     */
    static async register(snackbarNotication) {

        // only proceed with regisration if not in local development enviroment
        if (!('serviceWorker' in navigator) || window.location.hostname === 'localhost') {
            console.debug('Skipping service worker registration in localhost...');
            return;
        }

        const wb = new Workbox(serviceWorkerLocation);
        const registration = await wb.register();

        wb.addEventListener('waiting', (_) => this._skipWaitingPrompt(wb, registration, snackbarNotication));
    }

    /**
     * @param {Workbox} wb
     * @param {ServiceWorkerRegistration} registration
     * @param {import('../component/snackbar/SnackbarNotification.js').SnackbarNotication} snackbarNotication
     */
    static _skipWaitingPrompt(wb, registration, snackbarNotication) {

        // `event.wasWaitingBeforeRegister` === false:
        // if this is the first time the updated service worker is waiting

        // `event.wasWaitingBeforeRegister` === true:
        // a previously updated service worker is still waiting.
        // Need to keep this in mind

        snackbarNotication.show();

        // snackbarNotication is a wrapper component for the ServiceWorkerUpdateNotification component
        // we only care if the user has selected the "Reload" button which will fire an event

        snackbarNotication.addEventListener('refreshNotificationEvent', (_) =>
            this._reloadServiceWorker(wb, registration)
        );
    }

    /**
     * @param {Workbox} wb
     * @param {ServiceWorkerRegistration} registration
     */
    static async _reloadServiceWorker(wb, registration) {

        // Assuming the user accepted the update, set up a listener
        // that will reload the page as soon as the previously waiting
        // service worker has taken control.
        wb.addEventListener('controlling', (event) => {
            window.location.reload();
        });

        if (registration && registration.waiting) {
            // Send a message to the waiting service worker, instructing it to activate.
            messageSW(registration.waiting, { type: 'SKIP_WAITING' });
        }
    }
}
