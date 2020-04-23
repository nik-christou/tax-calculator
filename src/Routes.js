import "./views/home/HomeView.js";
import "./views/countries/CountriesView.js";
import "./views/results/ResultsView.js";

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
            path: "/countries",
            animate: {
                enter: "countries-entering",
                leave: "countries-leaving"
            },
            component: "countries-view"
        },
        {
            path: "/results",
            animate: {
                enter: "results-entering",
                leave: "results-leaving"
            },
            component: "results-view"
        }
    ]
}];
