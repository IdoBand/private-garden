export function generatePath(logoName: string): string {
    if (logoName !== 'vite') {
        return `/src/assets/logos/${logoName}.png`
    }
    return `/src/assets/logos/${logoName}.svg`
}
 
 export default function About(){
    return(
        <>
            <div id="details-container">
                        <h2>Created by Ido Band</h2>

                        <b className='sub-header'>FrontEnd</b>
                        <ul className='tools'>
                                <li><img className='logo' src={generatePath('react')} />React</li>
                                <li><img className='logo' src={generatePath('typescript')}  />TypeScript</li>
                                <li><img className='logo' src={generatePath('vite')} />Vite</li>
                        </ul>
                        <b className='sub-header'>BackEnd</b>
                        <ul className='tools'>
                                <li><img className='logo' src={generatePath('nodejs')} />node.js</li>
                                <li>Express</li>
                                <li><img className='logo' src={generatePath('typescript')}  />TypeScript</li>
                        </ul > 
                        <b className='sub-header'>Contact</b>
                        <ul className='nav-container'>
                            <li className="nav-links"><a href='https://www.linkedin.com/in/ido-band/' target="_blank"><img className='logo' src={generatePath('linkedin')} /></a></li>
                            <li className="nav-links"><a href='https://github.com/IdoBand' target="_blank"><img className='logo' src={generatePath('github')} /></a></li>
                            <li className="nav-links"><a href="mailto:ido.bandd@gmail.com"><img className='logo' src={generatePath('gmail')} /></a></li>
                        </ul>
                        
                    </div>
        </>
    )
}