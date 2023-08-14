import { AWSIcon } from "../../util/svgs"
export function generatePath(logoName: string): string {
    if (logoName !== 'vite') {
        return `/logos/${logoName}.png`
    }
    return `assets/logos/${logoName}.svg`
}
 
 export default function About(){
    return(
        <>
            <div id="details-container">
                <h2 className="about-header">Created by Ido Band</h2>
                <b className='about-sub-header'>FrontEnd</b>
                <ul className='tools'>
                    <li className="tool-li"><img className='logo' src={generatePath('react')} />React</li>
                    <li className="tool-li"><img className='logo' src={generatePath('typescript')} />TypeScript</li>
                    <li className="tool-li"><img className='logo' src={generatePath('vite')} />Vite</li>
                </ul>
                <b className='about-sub-header'>BackEnd</b>
                <ul className='tools'>
                    <li className="tool-li"><AWSIcon className="logo" /> Amazon Web Services, EC2 Ubuntu</li>
                    <li className="tool-li"><img className='logo' src={generatePath('nodejs')} />Node.JS</li>
                    <li className="tool-li"><img className='logo' src={generatePath('express')} />Express</li>
                    <li className="tool-li"><img className='logo' src={generatePath('typescript')} />TypeScript</li>
                </ul >
                <b className='about-sub-header'>DataBase</b>
                <ul className='tools'>
                    <li className="tool-li"><img className='logo' src={generatePath('mongodb')} />MongoDB</li>
                </ul >
                <b className='about-sub-header'>Contact</b>
                <ul className='contact-container'>
                    <li className="nav-links"><a href='https://www.linkedin.com/in/ido-band/' target="_blank" rel="noreferrer"><img className='logo' src={generatePath('linkedin')} /></a></li>
                    <li className="nav-links"><a href='https://github.com/IdoBand' target="_blank" rel="noreferrer"><img className='logo' src={generatePath('github')} /></a></li>
                    <li className="nav-links"><a href="mailto:ido.bandd@gmail.com"><img className='logo' src={generatePath('gmail')} /></a></li>
                </ul>
            </div>
        </>
    )
}