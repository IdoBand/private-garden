import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Modal from '../Modal/Modal';
import logo from '/assets/logo.jpg'
import About, { generatePath } from '../About/About';
import { useAppDispatch } from "../../redux/counterHooks"
import { setMobile } from '../../redux/windowSlice';

export default function Navbar() {
    const mediaQuery = window.matchMedia('(max-width: 800px)')
    const [about, setAbout] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(mediaQuery.matches)
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    useEffect(() => {
        const handleScreenChange = (event: MediaQueryListEvent) => {
            console.log(mediaQuery);
            setIsMobile(event.matches);
            dispatch(setMobile(event.matches))
          }
          mediaQuery.addEventListener('change',handleScreenChange);
          return () => {
            mediaQuery.removeEventListener('change',handleScreenChange);
          };
    }, [])

    function handleMobileMenuClick () {
        setMobileMenu(prev => !prev)
    }
    
    const navbarLinks = (containerClassName: string, linksClassName: string) => {
        return (
            <nav className={containerClassName}>
                <Link to={'/'} className={linksClassName} onClick={() => setMobileMenu(false)}>Home</Link>
                <Link to={'MyGarden'}className={linksClassName} onClick={() => setMobileMenu(false)}>My Garden</Link>
                <Link to={'IdentifyPlant'} className={linksClassName} onClick={() => setMobileMenu(false)}>Identify Plant</Link>
                <Link to={'RandomPlant'} className={linksClassName} onClick={() => setMobileMenu(false)}>Random Plant</Link>
                <div className={linksClassName} onClick={() => {setAbout(true); () => setMobileMenu(false)}}>About</div>
            </nav>
        )
    }
        
    return (
        <>
            <div id="contact-container">
                <ul className='contact-ul'>
                    <li className="contact-links"><a href='https://www.linkedin.com/in/ido-band/' target="_blank"><img className='contact-logo' src={generatePath('linkedin')} /></a></li>
                    <li className="contact-links"><a href='https://github.com/IdoBand' target="_blank"><img className='contact-logo' src={generatePath('github')} /></a></li>
                    <li className="contact-links"><a href="mailto:ido.bandd@gmail.com"><img className='contact-logo' src={generatePath('gmail')} /></a></li>
                    <li><h6>Created by Ido Band</h6></li>
                </ul>
            </div>
            <header>
                <div id="logo-container">
                    <img src={logo} id="page-logo" width="50"/>
                    <Link to={'/'}>
                        <h1> | Private Garden </h1>
                    </Link>
                </div>
                {isMobile ? 
                    <button className='mobile-menu-button' onClick={() => setMobileMenu(prev => !prev)} >{'\u2630'}</button> 
                : 
                    navbarLinks('nav-container', 'nav-link')
                }
            </header>
            {about && <Modal open={about} onClose={() => setAbout(false)} content={<About />}/>}
            {mobileMenu && <Modal open={mobileMenu} onClose={() => setMobileMenu(false)} content={navbarLinks('mobile-nav-container', 'mobile-nav-link')} />}
            <Outlet/>
        </>
    )
}