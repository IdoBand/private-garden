import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { ReactNode, lazy, Suspense } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Fallback from './components/Fallback/Fallback'
function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<Fallback />} >
          <Routes>
            {ROUTES.map(route => {
              return <Route path={route.path} element={<route.element />} key={route.path + 'route'} />
            })}
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App

const ROUTES = [
  {
      path: '/',
      element: lazy(() => import('./pages/Home/Home'))
  },
  {
      path: '/RandomPlant',
      element: lazy(() => import('./pages/RandomPlant/RandomPlant'))
  },
  {
      path: '/MyGarden',
      element: lazy(() => import('./pages/MyGarden/MyGarden'))
  },
  {
      path: '/PlantTimeline/:id',
      element: lazy(() => import('./pages/PlantTimeline/PlantTimeline'))
  },
  {
      path: '/IdentifyPlant',
      element: lazy(() => import('./pages/IdentifyPlant/IdentifyPlant'))
  },
  {
      path: '/Community',
      element: lazy(() => import('./pages/Community/Community'))
  },
]

const AppLayout = ({children}: AppLayoutProps) => {
  return (
    <>
      <Navbar />
        {children}
        <Outlet />
      <Footer />
    </>
  )
}

type AppLayoutProps = {
  children: ReactNode
}
