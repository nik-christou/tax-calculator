import { Workbox, messageSW } from "workbox-window";
import { SnackbarNotication } from "../component/snackbar/SnackbarNotification.js";

const serviceWorkerLocation = "../service-worker.js";

export class ServiceWorkerHandler {

    /**
     * @param {SnackbarNotication} snackbarNotication
     */
    static async register(snackbarNotication) {

        // only proceed with regisration if not in local development enviroment
        if (!("serviceWorker" in navigator) || location.hostname === "localhost") {
            console.debug("Skipping service worker registration in localhost...");
            return;
        }

        const wb = new Workbox(serviceWorkerLocation);
        const registration = await wb.register();

        wb.addEventListener("waiting", (event) => this._skipWaitingPrompt(wb, registration, event, snackbarNotication));
        wb.addEventListener('externalwaiting', (event) => this._skipWaitingPrompt(wb, registration, event, snackbarNotication));
    }

    /**
     * @param {Workbox} wb
     * @param {ServiceWorkerRegistration} registration
     * @param {import("workbox-window/utils/WorkboxEvent").WorkboxLifecycleWaitingEvent} event
     * @param {SnackbarNotication} snackbarNotication
     */
    static _skipWaitingPrompt(wb, registration, event, snackbarNotication) {

        // `event.wasWaitingBeforeRegister` === false:
        // if this is the first time the updated service worker is waiting
        // `event.wasWaitingBeforeRegister` === true: 
        // a previously updated service worker is still waiting.
        // Need to keep this in mind

        snackbarNotication.show();

        // SnackbarNotication is a wrapper component for the ServiceWorkerUpdateNotification component
        // we only care if the user has selected the "Reload" button which will fire an event

        snackbarNotication.addEventListener("reloadServiceWorkerEvent", (event) => 
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
            // Send a message to the waiting service worker,
            // instructing it to activate.  
            // Note: for this to work, you have to add a message
            // listener in your service worker
            messageSW(registration.waiting, {type: 'SKIP_WAITING'});
        }
    }
}
