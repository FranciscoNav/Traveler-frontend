import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Trips from './containers/Trips'
import Trip from './containers/Trip'
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Router>
        <br/>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/trips" component={Trips}/>
          <Route path="/trips/:id" component={Trip}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;


