import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import FormLogin from "./components/FormLogin";
import FormSignup from "./components/FormSignup";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route exact path="/"> */}
          <Route path="/login">
            <FormLogin />
          </Route>
          <Route path="/signup">
            <FormSignup />
          </Route>
          <Route
            path="/"
            render={(props) => (
              <div>
                <Header {...props} /> <Home {...props} />
              </div>
            )}
          >
            {/* <Header />
            <Home /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
