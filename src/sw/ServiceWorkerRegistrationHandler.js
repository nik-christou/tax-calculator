import {registerSW} from 'virtual:pwa-register';
import {userSelectionsStore} from '../datastore/UserSelectionsStore.js';

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

                    // clear user selections before updating
                    userSelectionsStore.resetUserSelections();

                    updateSW(true);
                });
                await snackbarNotification.show();
            }
        });


    }
}
