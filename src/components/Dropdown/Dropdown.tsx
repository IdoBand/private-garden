import { ReactNode, useState } from 'react'
import { ChevronDown } from '../../util/svgs'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

type DropdownProps = {
    title: string
    links?: DropDownLinkProps[]
    children?: ReactNode
}
export type DropDownLinkProps = {
    to: string
    title: string
    comingSoon?: boolean
}

const Dropdown = ({ title, links, children }: DropdownProps) => {

    const [showDropdown, setShowDropdown] = useState<boolean>(false)

  return (
    <div
    onMouseEnter={() => setShowDropdown(true)}
    onMouseLeave={() => setShowDropdown(false)}
        className="dropdown-container"
    >
        {title}
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
              {links?.map(link => {
                return <TitleAndSpan key={link.to} link={link} onClick={() => setShowDropdown(false)} />
              })}
              {children && children}
            </ul>
          </motion.div>
        }
  </div>
  )
}

export default Dropdown


type TitleAndSpanProps = {
  link: DropDownLinkProps
  onClick: () => void
}
export const TitleAndSpan = ({link, onClick}: TitleAndSpanProps) => {
  const location = useLocation()

  return (
    <Link to={link.to ? link.to : location.pathname} className='dropdown-li' onClick={onClick}>
      <span>{link.title}<span className='coming-soon'>{link.comingSoon && 'Coming Soon'}</span></span>
    </Link >
  )
}