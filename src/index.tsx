import './index.less';
import './index.scss';

import React, {ComponentClass} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer as HotReloader} from 'react-hot-loader';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './app';

const store = createStore(rootReducer, applyMiddleware(thunk));

const render = (Component: ComponentClass) => {
  ReactDOM.render(
    <HotReloader>
      <Provider store={store}>
        <Component />
      </Provider>
    </HotReloader>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    render(require('./app').default);
  });
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
}
