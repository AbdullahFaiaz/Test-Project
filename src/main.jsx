import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Pages/Home/Home';

import Root from './Pages/Root/Root';

import { HelmetProvider } from 'react-helmet-async';
import Login from './Pages/Login & Register/Login';
import Register from './Pages/Login & Register/Register';
import ContextComponent from './Context/ContextComponent';
import ErrorPage from './Pages/Shared/ErrorPage';
import PrivateRoute from './Pages/Private/PrivateRoute';
import Add from './Pages/Private/Add';
import AllSpots from './Pages/All Spots/AllSpots';
import ViewDetails from './Pages/Private/ViewDetails';
import MyList from './Pages/Private/MyList';
import Update from './Pages/Private/Update';
import UserProfile from './Pages/Private/UserProfile';

//tan stack query_____________________________________
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Users from './Pages/Private/Users';
import AddImage from './Pages/Private/AddImage';
import Buy from './Pages/Private/Buy';

const queryClient = new QueryClient()
//tan stack query ______________________________


const router = createBrowserRouter([
  {
    //https://server-fbz4si1aj-abdullah-faiazs-projects.vercel.app
    path: "/",
    element: <Root></Root>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index: "/",
        element: <Home/>,
        loader: () => fetch("http://localhost:5000/productCount")
      },
      {
        path: "/users",
        element: <PrivateRoute><Users/></PrivateRoute>
      },
      {
        path: "/add",
        // element: <PrivateRoute><Add/></PrivateRoute>
        element: <PrivateRoute><AddImage/></PrivateRoute>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path: "/allProducts",
        element: <AllSpots/>
      },
      {
        path: "/userProfile",
        element: <PrivateRoute><UserProfile/></PrivateRoute>
      },
      {
        path:"/update/:id",
        element: <PrivateRoute><Update/></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/update/${params.id}`)
      },
      {
        path: `/myProducts/:email`,
        // path: `/myProducts/:color`,
        element: <PrivateRoute>  <MyList/> </PrivateRoute>,
        // loader: ({params}) => fetch(`http://localhost:5000/myProducts?email=${user.email}&color=${params.color}`)
      },

      {
        path: "/details/:id",
        element: <PrivateRoute>  <ViewDetails/> </PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/details/${params.id}`)
      },
      {
        path: "/payment/:id",
        element: <PrivateRoute>  <Buy></Buy> </PrivateRoute>,
        // loader: ({params}) => fetch(`http://localhost:5000/details/${params.id}`)
      },

    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
              <ContextComponent>
                <RouterProvider router={router} />
              </ContextComponent>
        </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
