import { useAuth0 } from '@auth0/auth0-react'
import { ChevronDown, SignInArrow, SignOutArrow } from '../../util/svgs'
import { useState } from 'react'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/reduxHooks'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

  interface TitleAndSpanProps {
    link: DropDownLinkProps
    onClick: () => void
  }
  const TitleAndSpan = ({link, onClick}: TitleAndSpanProps) => {
    const location = useLocation()

    return (
      <Link to={link.to ? link.to : location.pathname} className='dropdown-li' onClick={onClick}>
        <span>{link.title}<span className='coming-soon'>{link.comingSoon && 'Coming Soon'}</span></span>
      </Link >
    )
  }
const SignedInDropdown = () => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const { loginWithPopup, logout } = useAuth0()
    const user = useAppSelector(state => state.window.user)
  return (
    <div
    onMouseEnter={() => setShowDropdown(true)}
    onMouseLeave={() => setShowDropdown(false)}
        className="dropdown-container"
    >
        <span>{user ? `Private` : 'NO USER'}</span>
        <ChevronDown className="dropdown-chevron" />
        {showDropdown && 
          <motion.div
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: 'auto',
              transition: {duration: 0.3}
            }}
            className='dropdown-ul-container'>
            <div className='dropdown-transparent-gap'></div>
            <ul className="dropdown-ul">
                <section className='user-greeting'>
                  {`Hi, ${user.firstName}`}
                  {user.profileImg && <img src={user.profileImg} className='dropdown-user-profile-img' />}
                </section>
                {DROPDOWN_LINKS.map(link => {
                  return <TitleAndSpan key={`dropdown+${link.title}`} link={link} onClick={() => setShowDropdown(false)} />
                })}
                {
                  user.id === '1' ? // meaning user = dummy user
                    <Button className='green-button' onClick={async() => {await loginWithPopup()}} type='button' text='Sign In' isDisabled={false}><SignInArrow width={14} /></Button>
                  :
                    <Button className='green-button' onClick={async() => {await logout()}} type='button' text='Sign Out' isDisabled={false} ><SignOutArrow width={14} /></Button>
                }
            </ul>
          </motion.div>
        }
  </div>
  )
}

export default SignedInDropdown
interface DropDownLinkProps {
  to: string
  title: string
  comingSoon: boolean
}
const DROPDOWN_LINKS = [
  {
    to: '',
    title: 'Profile',
    comingSoon: true,
  },
  {
    to: '/MyGarden',
    title: 'My Garden',
    comingSoon: false,
  },
]