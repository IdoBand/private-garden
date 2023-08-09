import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './pages/RandomPlant/RandomPlant.scss'
import './pages/Home/Home.scss'
import './pages/MyGarden/MyGarden.scss'
import './pages/PlantTimeline/PlantTimeline.scss'
import './pages/IdentifyPlant/IdentifyPlant.scss'
import './components/Navbar/Navbar.scss'
import './components/Modal/Modal.scss'
import './components/forms/Form.scss'
import './components/PlantCard/PlantCard.scss'
import './components/PlantUpdateCard/PlantUpdateCard.scss'
import './components/About/About.scss'
import './components/ExistingImage/ExistingImage.scss'
import './components/ExistingImage/ExistingImage.scss'
import './pages/Home/sections/HomeSection1.scss'
import './pages/Home/sections/HomeSection2.scss'
import './pages/Home/sections/HomeSection3.scss'
import './pages/Home/sections/HomeSection4.scss'
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
