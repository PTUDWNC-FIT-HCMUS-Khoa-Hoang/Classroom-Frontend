import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import ClassList from "./Components/Classroom/ClassList";
import Header from "./Components/Header/Header";
import { useEffect } from "react";
const App = () => {
  useEffect(() => {
    document.title = "Classroom";
  }, []);
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ClassList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
