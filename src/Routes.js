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
            component: "home-view",
            action: () => {
                import("./views/home/HomeView.js");
            }
        },
        {
            path: "/home",
            animate: {
                enter: "home-entering",
                leave: "home-leaving"
            },
            component: "home-view",
            action: () => {
                import("./views/home/HomeView.js");
            }
        },
        {
            path: "/countries",
            animate: {
                enter: "countries-entering",
                leave: "countries-leaving"
            },
            component: "countries-view",
            action: () => {
                import("./views/countries/CountriesView.js");
            }
        }
    ]
}];
