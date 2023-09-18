import ReactDOM from 'react-dom/client'
import App from './App'
import './components/forms/Form.scss'
import './components/ExistingImage/ExistingImage.scss'
import './components/Button/Button.scss'
import './components/Dropdown/Dropdown.scss'
import './components/Spinner/Spinner.scss'
import './components/Fallback/Fallback.scss'
import './pages/Home/sections/HomeSection1.scss'
import './pages/Home/sections/HomeSection2.scss'
import './pages/Home/sections/HomeSection3.scss'
import './pages/Home/sections/HomeSection4.scss'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Auth0Provider } from '@auth0/auth0-react'

const domain =  import.meta.env.VITE_AUTH0_DOMAIN
const clientId =  import.meta.env.VITE_AUTH0_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<Auth0Provider domain={domain} clientId={clientId} authorizationParams={{redirect_uri: window.location.origin}} >
            <Provider store={store}>
                <App />
              </Provider>
          </Auth0Provider>
)
