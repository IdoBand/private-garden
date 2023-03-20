import { createBrowserRouter } from 'react-router-dom';
import RandomPlant from './components/RandomPlant/RandomPlant';
import App from './App';
import Home from './components/Home/Home';
import MyGarden from './components/MyGarden/MyGarden';
import PlantTimeline from './components/PlantTimeline/PlantTimeline';
import IdentifyPlant from './components/IdentifyPlant/IdentifyPlant'
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