import Help from "./Help";
import Home from "./Home";
import Map from "./Map";

const routes = {
    'home': {component: <Home />, breadcrumbs: ['home']},
    'map': {component: <Map />, breadcrumbs: ['home', 'map']},
    'help': {component: <Help />, breadcrumbs: ['home', 'help']}
};

export default routes;
