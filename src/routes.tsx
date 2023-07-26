import { createBrowserRouter } from 'react-router-dom';
import RandomPlant from './pages/RandomPlant/RandomPlant';
import App from './App';
import Home from './pages/Home/Home';
import MyGarden from './pages/MyGarden/MyGarden';
import PlantTimeline from './pages/PlantTimeline/PlantTimeline';
import IdentifyPlant from './pages/IdentifyPlant/IdentifyPlant'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/RandomPlant',
                element: <RandomPlant />
            },
            {
                path: '/MyGarden',
                element: <MyGarden />
            },
            {
                path: '/PlantTimeline/:id',
                element: <PlantTimeline />
            },
            {
                path: '/IdentifyPlant',
                element: <IdentifyPlant />
            },
        ]
    }
])