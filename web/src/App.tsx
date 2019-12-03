import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './stores/router';
import { StoreProvider, rootStore } from './stores';
import './App.css';
import { ZKDetail } from './modules/zkDetail';
import Main from './modules/main';
rootStore.zk.init();
const App: React.FC = () => {
    return (
        <div className="App">
            <StoreProvider>
                <Router history={history}>
                    <Switch>
                        <Route path={`/detail`} component={ZKDetail} />
                        <Route path={`/`} component={Main} />
                    </Switch>
                </Router>
            </StoreProvider>
        </div>
    );
};

export default App;
