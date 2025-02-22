import { AsyncStorage } from 'react-native';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';

import accountReducer from '@modules/account/reducers';
import eventReducer from '@modules/event/reducers';

const peresistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'accountReducer',
    ],
    blacklist: [
        'eventReducer',
    ]
}

const rootReducer = combineReducers({
    account: accountReducer,
    event: eventReducer,
});

const persistedReducer = persistReducer(peresistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    applyMiddleware(
        createLogger(),
    )
)

let persistor = persistStore(store);

export {
    store, persistor,
}
