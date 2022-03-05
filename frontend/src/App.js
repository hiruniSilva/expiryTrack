import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Forgot from "./components/views/Forgot";
import ItemSummary from "./components/views/ItemSummary";
import ItemAdd from "./components/views/ItemAdd";
import Added from "./components/views/Added";

const Auth = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgot-password" exact component={Forgot} />
        <Route path="/" exact component={Login} />
        <Route path="/item-summary" exact component={ItemSummary}/>
        <Route path="/item-add" exact component={ItemAdd}/>
        <Route path="/added" exact component={Added}/>

      </Switch>
    </Router>
  );
};

export default Auth;
