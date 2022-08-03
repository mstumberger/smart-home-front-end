import {
  configureStore,
  ThunkAction,
  Action,
  applyMiddleware,
  compose,
  AnyAction,
  legacy_createStore as createStore,
  combineReducers
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import thunk from 'redux-thunk';
import { Connection } from 'autobahn';
import reduxAutobahn from 'redux-autobahn-js';
import counterReducer from '../features/counter/counterSlice';
import WsReducer from "../features/websocket/WsReducer";
import ClientsReducer from "../features/clients/ClientsReducer";

const connection = new Connection({
  url: 'ws://localhost:8080/ws',
  realm: 'realm1',
});

connection.onopen = (session: any, details: any) => {
  console.log('conn opened', session, details);
};

// @ts-ignore
connection.onclose = (session: any, details: any) => {
  console.log('conn closed', session, details);
};

// @ts-ignore
const initialState: any = {};
const enhancers: any = [];

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const autobahnMiddleware = reduxAutobahn.middleware();
const composedEnhancers = compose(
    applyMiddleware(thunk, autobahnMiddleware),
    ...enhancers
);
const rootReducer = combineReducers({
  autobahnConnection: reduxAutobahn.reducer,
  counter: counterReducer,
  websocketReducer: WsReducer,
  clientsReducer: ClientsReducer,
})

export const store = createStore(rootReducer, initialState, composedEnhancers);

// @ts-ignore
store.setAutobahnConnection = autobahnMiddleware.setConnection;
// @ts-ignore
store.closeAutobahnConnection = autobahnMiddleware.closeConnection;

/*store.subscribe(() => console.log('store updates', store.getState()));*/

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
