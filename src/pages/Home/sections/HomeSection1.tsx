import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import a from '/home-page/banana-pot.png'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { animateX } from '../../../util/framerVariants'
import { motion } from 'framer-motion'

const HomeSection1 = () => {
    const [className, setClassNames] = useState({decorativeContainer3: ''})
    const framerVariant = animateX(100, 0, true, 1.75)
    useEffect(() => {
        setClassNames({decorativeContainer3: 'final'})
    }, [])

  return (
    <section id="home-section-1">
        <div className='secondary-home-container'>
            <div className="home-text">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={framerVariant}
                    className='main-purpose'>
                        Manage Your Own <span className='main-purpose-span'>Private Garden</span> <br /> And Share It With Friends
                </motion.div>
                <div id='discover-button-container' className={className.decorativeContainer3}>
                    <Link to={'/MyGarden'} className='discover-button'>
                        Discover <ChevronRightIcon className='chevron' />
                    </Link>
                    <div>
                        Or Scroll To Learn More <ChevronDownIcon className='chevron' />
                    </div>
                </div>
            </div>
            <div id="decorative-container-1">
            </div>
            <div id="decorative-container-2">
            </div>
            <div id={'decorative-container-3'} className={className.decorativeContainer3}>
                <img src={a} alt="monstera"/>
            </div>
        </div>
    </section>
  )
}

export default HomeSection1