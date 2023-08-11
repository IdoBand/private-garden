import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Modal from '../Modal/Modal';
import About, { generatePath } from '../About/About';
import { useAppDispatch } from "../../redux/reduxHooks"
import { setMobile, signInUser, signOutUser } from '../../redux/windowSlice';
import a from '/home-page/111.png'
import { PrivateGardenLogo } from '../../util/svgs';
import { useAuth0 } from '@auth0/auth0-react'
import { SignInArrow, SignOutArrow } from '../../util/svgs';
import FullScreenOverlay from '../FullScreenOverlay/FullScreenOverlay';
import SignedInDropdown from '../SignedInDropdown/SignedInDropdown';
import MobileNavMenu from '../MobileNavMenu/MobileNavMenu';
export default function Navbar() {
    const mediaQuery = window.matchMedia('(max-width: 1100px)')
    const [about, setAbout] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(mediaQuery.matches)
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
    const [className, setClassNames] = useState({greenImgBg: ''})
    const dispatch = useAppDispatch()
    const location = useLocation()
    const pathName = location.pathname
    const { loginWithPopup, logout, isAuthenticated, user, isLoading: isSignInLoading, error } = useAuth0()
  
    useEffect(() => {
        const handleScreenChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
            dispatch(setMobile(event.matches))
          }
          mediaQuery.addEventListener('change',handleScreenChange);
          return () => {
            mediaQuery.removeEventListener('change',handleScreenChange);
          };
    }, [])


    useEffect(() => {
        if (pathName !== '/') {
            setClassNames({greenImgBg: ''})
        } else {
            setTimeout(() => {
                setClassNames({greenImgBg: 'final'})
            }, 700)
        }
    }, [pathName])

    useEffect(() => {
        if (user) {
            dispatch(signInUser(user))
            
        } else {
            dispatch(signOutUser())
        }
    }, [user])

    useEffect(() => {
        if (!isMobile) {
            setMobileMenu(false)
        }
    }, [isMobile])
    
    return (
        <>
            <PrivateGardenLogo className='sticky-logo' />
            <div id="contact-container">
                <ul className='contact-ul'>
                    <li className="contact-links"><a href='https://www.linkedin.com/in/ido-band/' target="_blank" rel="noreferrer"><img className='contact-logo' src={generatePath('linkedin')} /></a></li>
                    <li className="contact-links"><a href='https://github.com/IdoBand' target="_blank" rel="noreferrer"><img className='contact-logo' src={generatePath('github')} /></a></li>
                    <li className="contact-links"><a href="mailto:ido.bandd@gmail.com"><img className='contact-logo' src={generatePath('gmail')} /></a></li>
                    <li><h6>Created by Ido Band</h6></li>
                </ul>
            </div>
            <header>
                <div className='header-content'>
                    <Link to={'/'} className='app-name'>
                        <PrivateGardenLogo className='navbar-logo' />
                        Private Garden
                    </Link>

                    {(isMobile && pathName === '/') && 
                        <div className='home-main-img-container'>
                            <div id='green-img-bg' className={className.greenImgBg}>
                                <img id="home-main-img" src={a} />
                                <button className='mobile-menu-button-home' onClick={() => setMobileMenu(prev => !prev)} >{'\u2630'}</button> 
                            </div>
                        </div>
                    }
                    {(isMobile && !(pathName === '/')) && 
                        <div className="not-home-page-menu-button-container">
                            <button className='mobile-menu-button-not-home' onClick={() => setMobileMenu(prev => !prev)} >{'\u2630'}</button>
                        </div>
                    }
                    {!isMobile &&
                        <nav className='nav-container'>
                            {
                                NAVBAR_LINKS.map(link => {
                                    return (
                                        <Link
                                            key={link.title}
                                            to={link.title === 'About' ? location : link.to}
                                            className='nav-link'
                                            onClick={link.title === 'About' ? () => setAbout(true) : undefined}>
                                                {link.title}
                                        </Link>)
                                })
                            }
                            {isAuthenticated ? 
                                <div className='nav-link'><SignedInDropdown /></div>
                            :
                                <div className='nav-link' onClick={async() => {await loginWithPopup()}}>Sign In&nbsp;<SignInArrow width={14} /></div>
                            }
                            {(pathName === '/' && !isMobile) &&
                                <div className='desktop-home-main-img-container'>
                                    <div id='green-img-bg' className={className.greenImgBg}>
                                        <img id="home-main-img" src={a} />
                                    </div>
                                </div>
                            }
                        </nav>
                    }
                </div>
            </header>
            {about && <Modal open={about} onClose={() => setAbout(false)}><About /></Modal>}
            {mobileMenu && <Modal
                                open={mobileMenu} 
                                onClose={() => setMobileMenu(false)} >
                                <MobileNavMenu setAbout={setAbout}/> </Modal>}
            {isSignInLoading && <FullScreenOverlay />}
            <Outlet/>
        </>
    )
}

const NAVBAR_LINKS = [
    {
        to: 'IdentifyPlant',
        title: 'Identify Plant',
    },
    {
        to: 'RandomPlant',
        title: 'Random Plant',
    },
    {
        to: 'About',
        title: 'About',
    },
]