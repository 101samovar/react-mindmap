import React from "react";
import Breadcrumbs from "./ui-components/Breadcrumbs";
import Content from "./ui-components/Content";
import Header from "./ui-components/Header";
import LeftMenu from "./ui-components/LeftMenu";
import router from "./ui-components/router";
import routes from "./ui-components/routes";
import {} from "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    router.init(routes);
    const route = router.getRoute();
    this.state = {
      component: route.component,
      breadcrumbs: route.breadcrumbs
    };
    router.subscribe(this.onRouteChange);
  }
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
  }
  onRouteChange = () => {
    const route = router.getRoute();
    if (this._isMounted) {
      this.setState({
        component: route.component,
        breadcrumbs: route.breadcrumbs
      });
    }
  };
  render() {
    return (<div>
      <Header />
      <LeftMenu />
      <Breadcrumbs list={this.state.breadcrumbs} />
      <Content component={this.state.component} />
    </div>);
  }
}

export default App;
