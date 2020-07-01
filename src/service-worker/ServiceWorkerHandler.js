import { Workbox } from "workbox-window";
import { SnackbarNotication } from "../component/snackbar/SnackbarNotification.js";

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

        const wb = new Workbox("../service-worker.js");

        wb.addEventListener("activated", (event) => this._handleActivationState(event));
        wb.addEventListener("waiting", (event) => this._handleWaitingState(event, snackbarNotication));

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
     * @param {SnackbarNotication} snackbarNotication
     */
    static _handleWaitingState(event, snackbarNotication) {

        snackbarNotication.show();
    }
}
