import { Workbox } from "workbox-window";

export class SWRegister {
    static register() {
        // only proceed with regisration if not in local development enviroment
        if (!("serviceWorker" in navigator) || location.hostname === "localhost") {
            console.debug("Skipping service worker registration in localhost...");
            return;
        }

        const wb = new Workbox("../service-worker.js");

        wb.addEventListener("activated", (event) => this._handleActivationState(event));
        wb.addEventListener("waiting", (event) => this._handleWaitingState(event));

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
     */
    static _handleWaitingState(event) {
        console.debug(event);
        console.debug("New and updated content is available. waiting...");
        // present an update app button
    }
}
