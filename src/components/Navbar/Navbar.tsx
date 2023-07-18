import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Modal from '../Modal/Modal';
import logo from '/assets/logo-png.png'
import About, { generatePath } from '../About/About';
import { useAppDispatch } from "../../redux/reduxHooks"
import { setMobile } from '../../redux/windowSlice';
import a from '/assets/home-page/111.png'

export default function Navbar() {
    const mediaQuery = window.matchMedia('(max-width: 1100px)')
    const [about, setAbout] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(mediaQuery.matches)
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const location = useLocation()

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
    
    const navbarLinks = (containerClassName: string, linksClassName: string) => {
        return (
            <nav className={containerClassName}>
                <Link to={'MyGarden'}className={linksClassName} onClick={() => setMobileMenu(false)}>My Garden</Link>
                <Link to={'IdentifyPlant'} className={linksClassName} onClick={() => setMobileMenu(false)}>Identify Plant</Link>
                <Link to={'RandomPlant'} className={linksClassName} onClick={() => setMobileMenu(false)}>Random Plant</Link>
                <div className={linksClassName} onClick={() => {setAbout(true); () => setMobileMenu(false)}}>About</div>
                {(location.pathname === '/' && !isMobile) &&
                    <div className='desktop-home-main-img-container'>
                        <div className='green-img-bg'>
                            <img id="home-main-img" src={a} />
                        </div>
                    </div>
                }
         
            </nav>
        )
    }
        
    return (
        <>
            <img src={logo} id="sticky-logo" width="50"/>
            <div id="contact-container">
                <ul className='contact-ul'>
                    <li className="contact-links"><a href='https://www.linkedin.com/in/ido-band/' target="_blank"><img className='contact-logo' src={generatePath('linkedin')} /></a></li>
                    <li className="contact-links"><a href='https://github.com/IdoBand' target="_blank"><img className='contact-logo' src={generatePath('github')} /></a></li>
                    <li className="contact-links"><a href="mailto:ido.bandd@gmail.com"><img className='contact-logo' src={generatePath('gmail')} /></a></li>
                    <li><h6>Created by Ido Band</h6></li>
                </ul>
            </div>
            <header>
                <div className='header-content'>
                    <Link to={'/'} className='app-name'>
                        <img src={logo} id="page-logo" />
                        Private Garden
                    </Link>
                    {(isMobile && location.pathname === '/') && 
                        <div className='home-main-img-container'>
                            <div className='green-img-bg'>
                                <img id="home-main-img" src={a} />
                                <button className='mobile-menu-button-home' onClick={() => setMobileMenu(prev => !prev)} >{'\u2630'}</button> 
                            </div>
                        </div>
                    }
                    {(isMobile && !(location.pathname === '/')) && 
                        <div className="not-home-page-menu-button-container">
                            <button className='mobile-menu-button-not-home' onClick={() => setMobileMenu(prev => !prev)} >{'\u2630'}</button>
                        </div>
                    }
                    {!isMobile &&
                        navbarLinks('nav-container', 'nav-link')
                    }
                </div>
            </header>
            {about && <Modal open={about} onClose={() => setAbout(false)} content={<About />}/>}
            {mobileMenu && <Modal 
                                open={mobileMenu} 
                                onClose={() => setMobileMenu(false)} 
                                content={navbarLinks('mobile-nav-container', 'mobile-nav-link')} />}
            <Outlet/>
        </>
    )
}