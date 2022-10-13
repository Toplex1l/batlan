import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';
//Pages 
import App from './App';
import Root from './routes/root';
import ErrorPage from './error-page';
import Login from './components/users/login';
import Games from './components/games';
import Tirage from './components/admin/tirage';
import Groups from './components/admin/groups';
import '../src/assets/fonts/blankRiver.ttf'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/logged",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "games",
        element: <Games/>,
      },
      {
        path: "tirage",
        element: <Tirage/>,
      },
      {
        path: "groups",
        element: <Groups/>,
      },
    ],
  },
]);

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.style.background = "#363636";
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
        <ToastContainer/>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
