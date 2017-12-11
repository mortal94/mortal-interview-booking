import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import {Provider} from "mobx-react";
import stores from './stores/Stores';

import './styles/index.scss';

import {useStrict} from 'mobx';
useStrict(true);


registerServiceWorker();

const render = AppComponent => {
    ReactDOM.render(
        <Provider {...stores}>
            <AppComponent/>
        </Provider>,
        document.getElementById('root')
    );
};

render(App);

// This is a workaround to HMR support because babel-plugin-dva-hmr is not available with create-react-app
if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}
