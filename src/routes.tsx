import { createBrowserRouter } from 'react-router-dom';
import LearnSomethingNew from './components/LearnSomethingNew/LearnSomethingNew';
import App from './App';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navbar />,
        children: [
            {
                path: '/Home',
                element: <Home />
            },
            {
                path: '/LearnSomethingNew',
                element: <LearnSomethingNew />
            },
            {
              
            },
         

        ]
    }
])