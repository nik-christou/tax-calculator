import {registerSW} from 'virtual:pwa-register';

export class SWHandler {

    /**
     * @param {SnackbarNotification} snackbarNotification
     */
    register(snackbarNotification) {

        if (!('serviceWorker' in navigator)) {
            return;
        }

        const updateSW = registerSW({
            async onNeedRefresh() {
                await snackbarNotification.show();
            }
        });

        addEventListener('refreshNotificationEvent', (_) => {
            updateSW();
        });
    }
}

export const serviceWorkerHandler = Object.freeze(new SWHandler());
