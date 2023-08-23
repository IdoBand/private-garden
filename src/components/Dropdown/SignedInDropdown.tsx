import { useAuth0 } from '@auth0/auth0-react'
import {  SignInArrow, SignOutArrow } from '../../util/svgs'
import Button from '../Button/Button'
import { useAppSelector } from '../../redux/reduxHooks'
import { TitleAndSpan } from './Dropdown'
import Dropdown from './Dropdown'
import { userManager } from '../../types/UserManager'
const SignedInDropdown = () => {

    const { loginWithPopup, logout, } = useAuth0()
    const user = useAppSelector(state => state.window.user)
  return (
    <Dropdown title='Private'>
      <ul className="signed-in">
          <section className='user-greeting'>
            {`Hi, ${userManager.capitalize(user.firstName)}`}
            {user.profileImg && <img src={user.profileImg as string} className='dropdown-user-profile-img' />}
          </section>
          {DROPDOWN_LINKS.map(link => {
            return <TitleAndSpan key={`dropdown+${link.title}`} link={link} onClick={() => {return}} />
          })}
          {
            user.id === 'dummy.user@dummy.com' ? // meaning user = dummy user
              <Button className='green-button' onClick={async() => {await loginWithPopup()}} type='button' text='Sign In' isDisabled={false}><SignInArrow width={14} /></Button>
            :
              <Button className='green-button' onClick={async() => {await logout()}} type='button' text='Sign Out' isDisabled={false} ><SignOutArrow width={14} /></Button>
            }
      </ul>
  </Dropdown>
  )
}

export default SignedInDropdown
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