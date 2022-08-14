import {registerSW} from 'virtual:pwa-register';

export class SWHandler {

    /**
     * @param {SnackbarNotification} snackbarNotification
     */
    register(snackbarNotification) {

        if (!('serviceWorker' in navigator)) {
            return;
        }

        console.log("SW Handler update SW");

        const updateSW = registerSW({
            async onNeedRefresh() {
                console.log("SW Handler onNeedRefresh fired")
                await snackbarNotification.show();
            }
        });

        addEventListener('refreshNotificationEvent', (_) => {
            console.log("SW Handler refreshNotificationEvent captured");
            updateSW();
        });
    }
}

export const serviceWorkerHandler = Object.freeze(new SWHandler());
