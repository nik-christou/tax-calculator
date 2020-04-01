import "./views/home/HomeView.js";
import "./views/countries/CountriesView.js";

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
        }
    ]
}];
