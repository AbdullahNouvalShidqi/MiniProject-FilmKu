import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import Router from './router/Router';
import { ApolloProvider } from '@apollo/client';
import client from './config/graphQlClient';

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router/>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
