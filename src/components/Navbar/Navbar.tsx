import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react'
import Modal from '../Modal/Modal';
import logo from '../../assets/logo.jpg'
import About, { generatePath } from '../About/About';

export default function Navbar() {
    const [about, setAbout] = useState(false)
   
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
                <ul className="nav-container">
                    <li><Link to={'/'} className="nav-links">Home</Link></li>
                    <li><Link to={'MyGarden'}className="nav-links">My Garden</Link></li>
                    <li><Link to={'IdentifyPlant'} className="nav-links">Identify Plant</Link></li>
                    <li><Link to={'RandomPlant'} className="nav-links">Random Plant</Link></li>
                    <li><Link className="nav-links" onClick={() => setAbout(true)}>About</Link></li>
                </ul>
            </header>
            {about && <Modal open={about} onClose={() => setAbout(false)} content={<About />}/>}
            <Outlet/>
        </>
    )
}