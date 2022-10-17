import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';
import { AuthProvider } from './hoc/AuthProvider';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs"

dayjs.extend(isBetween)
dayjs.extend(customParseFormat)
dayjs.extend(utc)


ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
  , document.getElementById('root'));