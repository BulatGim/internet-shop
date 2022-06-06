import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserState';
import DeviceStore from "./store/DeviceStore";


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
        devices: new DeviceStore(),
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

reportWebVitals();
