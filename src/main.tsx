import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './components/Navbar/Navbar.scss'
import './components/LearnSomethingNew/MeetAPlant.scss'
import './components/Home/Home.scss'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
