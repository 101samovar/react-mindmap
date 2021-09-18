const router = {
    init: (routes) => {
        router.routes = routes;
        [router.home, router.homeRoute] = Object.entries(routes)[0];
        window.onpopstate = (e) => {
            router.onChange(e);
        }
        router.set();
    },
    setRoute: (route, param) => {
        let url = window.location.origin + '/' + route;
        if (param) {
            url += '/' + param;
        }
        window.history.pushState('', '', url);
        router.onChange();
    },
    getRoute: () => {
        return router.route;
    },
    getParams: () => {
        return router.params;
    },
    set: () => {
        const path = window.location.pathname;
        const routeName = path.split('/')[1];
        router.route = router.routes[routeName] || router.homeRoute;
        router.params = path.split('/').slice(2);
    },
    callbacks: [],
    onChange: () => {
        router.set();
        router.callbacks.forEach(callback => callback());
    },
    subscribe: (callback) => {
        router.callbacks.push(callback);
    }
};

export default router;
