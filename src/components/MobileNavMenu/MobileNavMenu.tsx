import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { SignInArrow, SignOutArrow } from "../../util/svgs"
import Button from "../Button/Button"
import mobileMenuBgImg from '/monstera-from-right.png'
import { useAppSelector } from "../../redux/reduxHooks"
import { SetStateAction } from "react"
interface MobileNavMenuProps {
  setAbout: (arg0: boolean) => void
  setMobileMenu: React.Dispatch<SetStateAction<boolean>>
}
const MobileNavMenu = ({setAbout, setMobileMenu}: MobileNavMenuProps) => {
  const user = useAppSelector(state => state.window.user)
  const { loginWithPopup, logout, isAuthenticated, } = useAuth0()
  return (
    <nav className="mobile-nav-container">
      <div className="mobile-menu-bg-img-container">
        <img src={mobileMenuBgImg} className="mobile-menu-bg-img" />
      </div>
      <span className="title">
        {`Hi, ${user.firstName}`}
      </span>
        {
          NAVBAR_LINKS.map(link => {
            return (
                <Link
                    key={link.title}
                    to={link.title === 'About' ? location : link.to}
                    className='nav-link'
                    onClick={link.title === 'About' ? () => setAbout(true) : () => setMobileMenu(false)}>
                        {link.title}
                </Link>)
        })
        }
        {
          isAuthenticated ?
            <Button className='green-button' onClick={async() => {await logout()}} type='button' text='Sign Out' isDisabled={false} ><SignOutArrow width={14} /></Button>
          :
            <Button className='green-button' onClick={async() => {await loginWithPopup()}} type='button' text='Sign In' isDisabled={false}><SignInArrow width={14} /></Button>
        }
    </nav>
  )
}

export default MobileNavMenu

const NAVBAR_LINKS = [
  {
      to: 'MyGarden',
      title: 'My Garden',
  },
  {
      to: 'Community',
      title: 'Community',
  },
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