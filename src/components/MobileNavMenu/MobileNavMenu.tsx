import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { SignInArrow, SignOutArrow } from "../../util/svgs"
import Button from "../Button/Button"
import mobileMenuBgImg from '/monstera-from-right.png'
interface MobileNavMenuProps {
  setAbout: (arg0: boolean) => void
}
const MobileNavMenu = ({setAbout}: MobileNavMenuProps) => {
  const { loginWithPopup, logout, isAuthenticated, user, isLoading: isSignInLoading, error } = useAuth0()
  return (
    <nav className="mobile-nav-container">
      <div className="mobile-menu-bg-img-container">
        <img src={mobileMenuBgImg} className="mobile-menu-bg-img" />
      </div>
        {
          NAVBAR_LINKS.filter((_, idx) => idx < 3).map(link => {
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
        {
          isAuthenticated ?
            <>
              <Link className="nav-link" to={NAVBAR_LINKS[3].to}>{NAVBAR_LINKS[3].title}</Link>
              <Button className='green-button' onClick={async() => {await logout()}} type='button' text='Sign Out' isDisabled={false} ><SignOutArrow width={14} /></Button>
            </>
          :
            <div className='nav-link' onClick={async() => {await loginWithPopup()}}>Sign In&nbsp;<SignInArrow width={14} /></div>
        }
    </nav>
  )
}

export default MobileNavMenu

const NAVBAR_LINKS = [
  {
      to: 'IdentifyPlant',
      title: 'Identify Plant',
  },
  {
      to: 'Random Plant',
      title: 'RandomPlant',
  },
  {
      to: 'About',
      title: 'About',
  },
  {
      to: 'MyGarden',
      title: 'My Garden',
  },
]