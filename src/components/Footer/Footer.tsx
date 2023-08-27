import { Link } from 'react-router-dom'
import { InstagramSvg, FacebookSvg, LinkedinBorderlessSvg, GithubSvg } from '../../util/svgs'
import { PrivateGardenLogo } from '../../util/svgs'
const Footer = () => {
  return (
    <footer className='footer-container'>
        <section className='footer-hero-section'>
            <div className='form-header' id='footer-name'><PrivateGardenLogo fill='#fff' /> PRIVATE GARDEN</div>
            <p>
                {PARAGRAPH}
            </p>
            <div className="footer-svgs-container">
                {SVGS.map((svg, idx) => {
                    return <a
                    key={idx}
                    href={svg.to}
                    className='footer-svg-link'
                    target="_blank"
                    rel="noopener noreferrer"
                    >{svg.svg}</a>
                })}
            </div>
            <span className='copy-rights'>&copy; Copyright All Rights Reserved 2023</span>
        </section>
        <section className='footer-nav-section'>
            <div className='form-header'>Navigate</div>
            <nav className='footer-nav'>
                {LINKS.map(link => {
                    return <Link
                        key={link.to + 'footer'}
                        to={link.to}
                        className='footer-link' >{link.title}</Link>
                })}
            </nav>
        </section>
    </footer>
  )
}

export default Footer

const PARAGRAPH = 'Manage Your Own Private Garden And Share It With Friends'

const SVGS = [
    {
        to: undefined,
        svg: <InstagramSvg />,
    },
    {
        to: undefined,
        svg: <FacebookSvg className='footer-svg'/>,
    },
    {
        to: 'https://www.linkedin.com/in/ido-band/',
        svg: <LinkedinBorderlessSvg className='footer-svg'/>,
    },
    {
        to: 'https://github.com/IdoBand',
        svg: <GithubSvg className='footer-svg'/>,
    },
]
const LINKS = [
    {
        to: '/Community',
        title: 'Community',
    },
    {
        to: '/IdentifyPlant',
        title: 'Identify Plant',
    },
    {
        to: '/RandomPlant',
        title: 'Random Plant',
    },
    {
        to: '/MyGarden',
        title: 'My Garden',
    },
    {
        to: '/Home',
        title: 'Home',
    },
]