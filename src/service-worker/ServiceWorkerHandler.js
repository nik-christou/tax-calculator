import { Workbox } from "workbox-window";
import { ServiceWorkerNotication } from "./ServiceWorkerNotification.js";

export class ServiceWorkerHandler {

    /**
     * @param {ServiceWorkerNotication} serviceWorkerNotification
     */
    static register(serviceWorkerNotification) {

        // only proceed with regisration if not in local development enviroment
        if (!("serviceWorker" in navigator) || location.hostname === "localhost") {

            console.debug("Skipping service worker registration in localhost...");

            serviceWorkerNotification.show();

            return;
        }

        const wb = new Workbox("../service-worker.js");

        wb.addEventListener("activated", (event) => this._handleActivationState(event));
        wb.addEventListener("waiting", (event) => this._handleWaitingState(event, serviceWorkerNotification));

        wb.register();
    }

    /**
     * @param {import("workbox-window/utils/WorkboxEvent").WorkboxLifecycleEvent} event
     */
    static _handleActivationState(event) {
        console.debug(event);
        if (!event.isUpdate) {
            console.debug("Service worker activated for the first time!");
        }
    }

    /**
     * @param {import("workbox-window/utils/WorkboxEvent").WorkboxLifecycleWaitingEvent} event
     * @param {ServiceWorkerNotication} serviceWorkerNotification
     */
    static _handleWaitingState(event, serviceWorkerNotification) {
        serviceWorkerNotification.show();
    }
}
