import { Workbox } from "workbox-window";

export class SWRegistration {
    static register() {
        // only proceed with regisration if not in local development enviroment
        if (!("serviceWorker" in navigator) || location.hostname === "localhost") {
            console.log("Skipping service worker registration in localhost...");
            return;
        }

        console.log("Proceeding with service worker registration...");
        const wb = new Workbox("../service-worker.js");

        wb.addEventListener("activated", event => this._handleActivationState(event));

        wb.addEventListener("waiting", event => this._handleWaitingState(event));

        wb.register();
    }

    static _handleActivationState(event) {
        console.log(event);
        if (!event.isUpdate) {
            console.log("Service worker activated for the first time!");
        }
    }

    static _handleWaitingState(event) {
        console.log(event);
        console.log("New and updated content is available. waiting...");
        // present an update app button
    }
}
