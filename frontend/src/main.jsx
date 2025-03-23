import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home/page.jsx'
import Auth from './pages/auth/page.jsx'
import Profile from './pages/profile/page.jsx'
import Plates from './pages/plates/page.jsx'
import Cart from './pages/cart/page.jsx'

const pages = createBrowserRouter([
	{
	  path: '/mygastronomy',
	  element: <App />,
	  children: [
		{ path: '/mygastronomy', element: <Home /> },
		{ path: '/mygastronomy/auth', element: <Auth /> },
		{ path: '/mygastronomy/profile', element: <Profile /> },
		{ path: '/mygastronomy/plates', element: <Plates /> },
		{ path: '/mygastronomy/cart', element: <Cart /> },
	  ],
	},
  ])

ReactDom.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={pages}></RouterProvider>
	</React.StrictMode>,
)
