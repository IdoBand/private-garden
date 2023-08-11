import { useAuth0 } from '@auth0/auth0-react'
import { ChevronDown, SignOutArrow } from '../../util/svgs'
import { useState } from 'react'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
interface NavbarDropdownProps {
    linkData: {
      title: string
      link: string
      dropdown: boolean,
      dropdownTitles?: string[],
      dropdownLinks?: string[]
    }
  }
  interface TitleAndSpanProps {
    title: string
  }
  const TitleAndSpan = ({title}: TitleAndSpanProps) => {
    return (
      <li className='dropdown-li'>
          {title}
          <span className='dropdown-span'>&nbsp;</span>
      </li>
    )
  }
const SignedInDropdown = () => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const { loginWithPopup, logout, isAuthenticated, user, isLoading: isSignInLoading, error } = useAuth0()
  return (
    <div
    // onClick ={() =>setShowDropdown(prev => ! prev)}
    onMouseEnter={() => setShowDropdown(true)}
    onMouseLeave={() => setShowDropdown(false)}
        className="dropdown-container"
    >
        <span>{user ? `Profile` : 'NO USER'}</span>
        <ChevronDown className="dropdown-chevron" />
        {showDropdown && 
          <div className='dropdown-ul-container'>
            <div className='dropdown-transparent-gap'></div>
            <ul className="dropdown-ul">
                <TitleAndSpan title={'Profile'} />
                <Link to={'MyGarden'} >My Garden</Link>
                <Button className='green-button' onClick={async() => {await logout()}} type='button' text='Sign Out' isDisabled={false} ><SignOutArrow width={14} /></Button>
            </ul>
          </div>
        }
  </div>
  )
}

export default SignedInDropdown