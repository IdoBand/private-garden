import { createBrowserRouter } from 'react-router-dom';
import RandomPlant from './components/RandomPlant/RandomPlant';
import App from './App';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import MyGarden from './components/MyGarden/MyGarden';
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
                path: '/LearnSomethingNew',
                element: <RandomPlant />
            },
            {
                path: '/MyGarden',
                element: <MyGarden />
            },
         

        ]
    }
])