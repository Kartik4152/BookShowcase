import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookInfo from "./pages/BookInfo";
import "./App.scss";

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/book/:id">
          <BookInfo />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
