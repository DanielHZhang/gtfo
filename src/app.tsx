import React, {PureComponent} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './containers/home';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className='fullscreen' role='main'>
          <Switch>
            <Route path='/' exact={true} component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
