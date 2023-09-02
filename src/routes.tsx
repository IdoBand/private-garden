import { createBrowserRouter } from 'react-router-dom';
import RandomPlant from './pages/RandomPlant/RandomPlant';
import App from './App';
import Home from './pages/Home/Home';
import MyGarden from './pages/MyGarden/MyGarden';
import PlantTimeline from './pages/PlantTimeline/PlantTimeline';
import IdentifyPlant from './pages/IdentifyPlant/IdentifyPlant'
import Community from './pages/Community/Community';
import Footer from './components/Footer/Footer';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <><Home /> <Footer /></>
            },
            {
                path: '/RandomPlant',
                element: <><RandomPlant /> <Footer /></>
            },
            {
                path: '/MyGarden',
                element: <><MyGarden /> <Footer /></>
            },
            {
                path: '/PlantTimeline/:id',
                element: <><PlantTimeline /> <Footer /></>
            },
            {
                path: '/IdentifyPlant',
                element: <><IdentifyPlant /> <Footer /></>
            },
            {
                path: '/Community',
                element: <><Community /> <Footer /></>
            },
        ]
    }
])