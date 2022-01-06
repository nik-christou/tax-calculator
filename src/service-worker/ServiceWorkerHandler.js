import { registerSW } from 'virtual:pwa-register'

export class ServiceWorkerHandler {

    /**
     * @param {import('../component/snackbar/SnackbarNotification.js').SnackbarNotication} snackbarNotication
     */
    static async register(snackbarNotication) {

        if (!('serviceWorker' in navigator)) {
            return;
        }

        const updateSW = registerSW({
            onNeedRefresh() {
                snackbarNotication.show();
            }
        });

        snackbarNotication.addEventListener('refreshNotificationEvent', (_) => {
            updateSW();
        });
    }
}
