import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {createMemoryHistory} from 'history';
import routes from './routes';
import configureStore from './store';
import Container from '@material-ui/core/Container';
import ParticlesBg from 'particles-bg'
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';

const syncHistoryWithStore = (store, history) => {
    const {router} = store.getState();
    if (router && router.location) {
        history.replace(router.location);
    }
};

const initialState = {};
const routerHistory = createMemoryHistory();
const store = configureStore(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#e6085c",
        },
        secondary: {
            main: '#d76288',
        },
    },
});


ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Container>
                <ConnectedRouter history={routerHistory}>{routes}</ConnectedRouter>
            </Container>
        </ThemeProvider>
        <ParticlesBg type="cobweb" color={"#e6085c"} bg={true}/>
    </Provider>,
    rootElement,
);
