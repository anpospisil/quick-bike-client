 
import { createStore, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension'

const persistConfig = {
  key: 'reducer',
  storage: storage,
  whitelist: ['user', 'bike'] // or blacklist to exclude specific reducers
};
const presistedReducer = persistReducer(persistConfig, rootReducer );
// @ts-ignore

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeWithDevTools(applyMiddleware(ReduxThunk));

const store = createStore(presistedReducer, enhancer);

export type AppState = ReturnType<typeof rootReducer>

const persistor = persistStore(store);

export { persistor, store };