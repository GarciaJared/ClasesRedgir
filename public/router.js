class Router {
    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
        window.addEventListener('popstate', () => {
            const pathNameSplit = window.location.pathname.split('/');
            const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : [''];
            this.loadRoute(...pathSegs);
        });
    }

    loadRoute(...urlSegs) {
        const matchedRoute = this._matchUrlToRoute(urlSegs);

        const url = `/${urlSegs.join('/')}`;
        history.pushState({}, '', url);

        const routerOutElm = document.querySelector('[data-router]');
        if (routerOutElm && matchedRoute) {
            routerOutElm.innerHTML = matchedRoute.template;
        }
    }

    _matchUrlToRoute(urlSegs) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegs = route.path.split('/').slice(1);
            if (routePathSegs.length !== urlSegs.length) {
                return false;
            }
            return routePathSegs.every((routePathSeg, i) => routePathSeg === urlSegs[i]);
        });
        return matchedRoute;
    }

    _loadInitialRoute() {
        const pathNameSplit = window.location.pathname.split('/');
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : [''];
        this.loadRoute(...pathSegs);
    }
}

export default Router;
