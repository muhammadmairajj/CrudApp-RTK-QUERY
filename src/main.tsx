import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from './features/api/apiSlice.ts';
import { photoSlice } from './features/photoapi/photoSlice.ts';
import { store } from './app/store.ts';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    {/* <ApiProvider api={apiSlice}> */}
      <App />
    {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>,
)
