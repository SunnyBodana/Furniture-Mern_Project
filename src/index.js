import React from 'react';
import ReactDOM from 'react-dom/client';
// RESTORE: Bootstrap CSS for grid system (container, row, col-*) - import first
import 'bootstrap/dist/css/bootstrap.min.css';
// RESTORE: Original custom CSS - import after Bootstrap
import './index.css';
// Bootstrap JS for dropdowns/modals
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router'; 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor } from './store/store';
import store from './store/store';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
  </React.StrictMode>
);
