import { BrowserRouter as Router, Route, Routes,Link  } from "react-router-dom";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Forgot from "./components/views/Forgot";
import ItemSummary from "./components/views/ItemSummary";
import ItemAdd from "./components/views/ItemAdd";
import Added from "./components/views/Added";

const Auth = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login/>} />
        <Route path="/register" exact element={<Register/>} />
        <Route path="/forgot-password" exact element={<Forgot/>} />
        <Route path="/" exact element={<Login/>} />
        <Route path="/item-summary" exact element={<ItemSummary/>}/>
        <Route path="/item-add" exact element={<ItemAdd/>}/>
        <Route path="/added" exact element={<Added/>}/>
      </Routes>
    </Router>
  );
};

export default Auth;
