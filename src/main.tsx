import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './components/Navbar/Navbar.scss'
import './components/RandomPlant/RandomPlant.scss'
import './components/Home/Home.scss'
import './components/MyGarden/MyGarden.scss'
import './components/Modal/Modal.scss'
import './components/forms/Form.scss'
import './components/PlantTimeline/PlantTimeline.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './redux/store'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      enabled: true, // disable this query from automatically running on page load
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  // </React.StrictMode>,
)
