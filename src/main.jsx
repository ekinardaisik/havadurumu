import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css'
import { RouterProvider } from 'react-router-dom';
import router from './Router';

import ToastDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';


const toastRoot = document.getElementById('toast-root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {
      ToastDOM.createPortal(
        <Toaster position="bottom-center" reverseOrder={false} />
        , toastRoot
      )}
      <RouterProvider router={router} />
  </>

);
