import ReactDOM from 'react-dom/client'
import { RouterProvider, redirect } from 'react-router-dom'
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
import './pages/Community/Community.scss'
import './components/Button/Button.scss'
import './components/SignedInDropdown/SignedInDropdown.scss'
import './components/MobileNavMenu/MobileNavMenu.scss'
import './components/Post/Post.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Auth0Provider } from '@auth0/auth0-react'
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
const domain =  import.meta.env.VITE_AUTH0_DOMAIN
const clientId =  import.meta.env.VITE_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<Auth0Provider domain={domain} clientId={clientId} authorizationParams={{redirect_uri: window.location.origin}} >
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                  <RouterProvider router={router} />
                </QueryClientProvider>
              </Provider>
          </Auth0Provider>

)
