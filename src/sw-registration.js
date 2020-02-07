import { Workbox } from "workbox-window";

export class SWRegistration {
    register() {
        console.log("Service worker registration");

        if (!"serviceWorker" in navigator) {
            return;
        }

        const wb = new Workbox("../service-worker.js");

        wb.addEventListener("activated", event =>
            this._handleActivationState(event)
        );
        wb.addEventListener("waiting", event =>
            this._handleWaitingState(event)
        );

        wb.register();
    }

    _handleActivationState(event) {
        console.log(event);
        if (!event.isUpdate) {
            console.log("Service worker activated for the first time!");
        }
    }

    _handleWaitingState(event) {
        console.log(event);
        // present an update app button
    }
}
