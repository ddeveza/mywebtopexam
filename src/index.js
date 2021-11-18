import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from './features/auth'
import breachEmailReducer from './features/breachedemail';
import msSecureScoreReducer from './features/mssecurescore';
import globalAdminAcctReducer from './features/globaladminacct';
import mfaReducer from './features/mfa';
import dormantReducer from './features/dormant';
import breachPhoneReducer from './features/breachedphone';

const store = configureStore({
  reducer:{
    
    auth:authReducer,
    breachEmail:breachEmailReducer,
    msSecure: msSecureScoreReducer,
    globalAdmin: globalAdminAcctReducer,
    mfa:mfaReducer,
    dormant:dormantReducer,
    breachPhone: breachPhoneReducer

  }
})

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  

  <MsalProvider instance={msalInstance}>
    <Provider store={store}>
        <App />
    </Provider>
  </MsalProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
