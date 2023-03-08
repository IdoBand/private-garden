import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react'
import Modal from '../Modal/Modal';
import logo from '../../assets/logo.jpg'
import About from '../About/About';

export default function Navbar() {
    const [about, setAbout] = useState(false)
   
    return (
        <>
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
                    <li><Link className="nav-links">Identify Plant</Link></li>
                    <li><Link to={'LearnSomethingNew'} className="nav-links">Random Plant</Link></li>
                    <li><Link className="nav-links" onClick={() => setAbout(true)}>About</Link></li>
                </ul>
            </header>
            {about && <Modal open={about} onClose={() => setAbout(false)} content={<About />}/>}
            <Outlet/>
        </>
    )
}