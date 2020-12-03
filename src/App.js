/*eslint-disable*/
import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './redux/reducers'
import { default as ReduxThunk } from 'redux-thunk';
import RouterApp from './components/apps/router-app';
import { ThemeWrapper } from './components/ui-kit/styled-templates'
import { StoreContext } from 'redux-react-hook';

const store = createStore(reducer, undefined, compose(applyMiddleware(ReduxThunk)))

let App = (props) => {
    return (
        <StoreContext.Provider value={store}>
            <ThemeWrapper>
                <RouterApp />
            </ThemeWrapper>
        </StoreContext.Provider>
    )
}

export default App;
/*eslint-enable*/