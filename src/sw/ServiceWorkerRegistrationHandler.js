import {registerSW} from 'virtual:pwa-register';

export class ServiceWorkerRegistrationHandler {

    /**
     * @param {SnackbarNotification} snackbarNotification
     */
    async register(snackbarNotification) {

        if (!('serviceWorker' in navigator) && !/localhost/.test(window.location)) {
            return;
        }

        const updateSW = registerSW({
            onOfflineReady() {},
            async onNeedRefresh() {
                addEventListener('refreshNotificationEvent', (_) => {

                    // TODO: Clear user selection in local storage

                    updateSW(true);
                });
                await snackbarNotification.show();
            }
        });


    }
}
