
export const routes = [
    {
        path: '/',
        children: [
            {
                path: '/',
                action: async () => {
                    await import('./views/home/HomeView.js');
                },
                animate: {
                    enter: 'home-entering',
                    leave: 'home-leaving'
                },
                component: 'home-view'
            },
            {
                path: '/home',
                action: async () => {
                    await import('./views/home/HomeView.js');
                },
                animate: {
                    enter: 'home-entering',
                    leave: 'home-leaving'
                },
                component: 'home-view'
            },
            {
                path: '/country-selection',
                action: async () => {
                    await import('./views/country_selection/CountrySelectionView.js');
                },
                animate: {
                    enter: 'country-selection-entering',
                    leave: 'country-selection-leaving'
                },
                component: 'country-selection-view'
            },
            {
                path: '/results',
                action: async () => {
                    await import('./views/results/ResultsView.js');
                },
                animate: {
                    enter: 'results-entering',
                    leave: 'results-leaving'
                },
                component: 'results-view'
            },
            {
                path: '/tax-details',
                action: async () => {
                    await import('./views/tax_details/TaxDetailsView.js');
                },
                animate: {
                    enter: 'tax-details-entering',
                    leave: 'tax-details-leaving'
                },
                component: 'tax-details-view'
            },
            {
                path: '/tax-options',
                action: async () => {
                    await import('./views/tax_options/TaxOptionsView.js');
                },
                animate: {
                    enter: 'tax-options-entering',
                    leave: 'tax-options-leaving'
                },
                component: 'tax-options-view'
            }
        ]
    }
];
