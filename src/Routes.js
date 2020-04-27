import "./views/home/HomeView.js";
import "./views/country_selection/CountrySelectionView.js";
import "./views/results/ResultsView.js";
import "./views/tax_details/TaxDetailsView.js";

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
        }
    ]
}];
