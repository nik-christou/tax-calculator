export const routes = [
    {
        path: "/",
        component: "home-view",
        action: () => {
            import("./views/home/HomeView.js");
        }
    },
    {
        path: "/home",
        component: "home-view",
        action: () => {
            import("./views/home/HomeView.js");
        }
    },
    {
        path: "/countries",
        component: "countries-view",
        action: () => {
            import("./views/countries/CountriesView.js");
        }
    }
];
