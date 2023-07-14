import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import './index.css'
import '@flaticon/flaticon-uicons/css/bold/rounded.css'

import SuspenseLoader from './components/SuspenseLoader/SuspenseLoader'

const BrowserRouter = createBrowserRouter([
  { 
    path: '/', 
    async lazy() {
      let { Loader, Landing } = await import('./routes/Landing.jsx')
      return {
        loader: Loader,
        Component: Landing,
      }
    }
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider 
      router={BrowserRouter}
      fallbackElement={<SuspenseLoader className="center" />}
    />

  </React.StrictMode>,
)
