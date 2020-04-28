import "./views/home/HomeView.js";
import "./views/results/ResultsView.js";
import "./views/tax_details/TaxDetailsView.js";
import "./views/country/options/CountryOptionsView.js";
import "./views/country/selection/CountrySelectionView.js";

export const routes = [
{
    path: '/',
    children: [
        {
            path: "/",
            animate: {
                enter: "home-entering",
                leave: "home-leaving"
            },
            component: "home-view"
        },
        {
            path: "/home",
            animate: {
                enter: "home-entering",
                leave: "home-leaving"
            },
            component: "home-view"
        },
        {
            path: "/country-selection",
            animate: {
                enter: "country-selection-entering",
                leave: "country-selection-leaving"
            },
            component: "country-selection-view"
        },
        {
            path: "/results",
            animate: {
                enter: "results-entering",
                leave: "results-leaving"
            },
            component: "results-view"
        },
        {
            path: "/tax-details",
            animate: {
                enter: "tax-details-entering",
                leave: "tax-details-leaving"
            },
            component: "tax-details-view"
        },
        {
            path: "/country-options",
            animate: {
                enter: "country-options-entering",
                leave: "country-options-leaving"
            },
            component: "country-options-view"
        }
    ]
}];
