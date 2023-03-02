import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react'
import Modal from '../Modal/Modal';

function generatePath(logoName: string): string {
    if (logoName !== 'vite') {
        return `/src/assets/logos/${logoName}.png`
    }
    return `/src/assets/logos/${logoName}.svg`
}

export default function Navbar() {
    const [about, setAbout] = useState(false)
   

    const details =
                    <div id="details-container">
                        <h2>Created by Ido Band</h2>

                        <b>FrontEnd</b>
                        <ul className='tools'>
                            
                                <li><img className='logo' src={generatePath('react')} />React</li>
                                <li><img className='logo' src={generatePath('typescript')}  />TypeScript</li>
                                <li><img className='logo' src={generatePath('vite')} />Vite</li>
                        </ul>
                        <b>BackEnd</b>
                        <ul className='tools'>
                            
                                <li><img className='logo' src={generatePath('nodejs')} />node.js</li>
                                <li>Express</li>
                                <li><img className='logo' src={generatePath('typescript')}  />TypeScript</li>
                        </ul > 
                        <ul className='nav-container'>
                        <li><img className='logo' src={generatePath('linkedin')} /><a href='https://www.linkedin.com/in/ido-band/' target="_blank">LinkedIn</a></li>
                        <li><img className='logo' src={generatePath('github')} /><a href='https://github.com/IdoBand' target="_blank">GitHub</a></li>
                        <li><img className='logo' src={generatePath('gmail')} /><a href="mailto:ido.bandd@gmail.com">ido.bandd@gmail.com</a></li>
                        </ul>
                        
                    </div>
    return (
        <>
            <header>
                <Link to={'/'}>
                    <h1> | Private Garden </h1>
                </Link>
                

                <ul className="nav-container">
                    <li><Link to={'/Home'} className="nav-links">Home</Link></li>
                    <li><Link to={'MyGarden'}className="nav-links">My Garden</Link></li>
                    <li><Link className="nav-links">Identify Plant</Link></li>
                    <li><Link to={'LearnSomethingNew'} className="nav-links">Random Plant</Link></li>
                    <li><Link className="nav-links" onClick={() => setAbout(true)}>About</Link></li>
                </ul>
            </header>
            {about && <Modal open={about} onClose={() => setAbout(false)} content={details}/>}
            <Outlet/>
        </>
    )
}