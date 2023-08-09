import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver'
import { animateY, animateX } from '../../../util/framerVariants'
import laptopLady from '/home-page/laptop-lady.png'
import bananaBottom from '/home-page/banana-bottom.png'
import { motion, AnimatePresence } from 'framer-motion'
import { PrivateGardenLogo } from "../../../util/svgs"
const HomeSection4 = () => {

    const { htmlElementRef, firstIntersection } = useIntersectionObserver('4')
    const headerFramerVariant = animateY(100, 0, firstIntersection, 0)
    const imgFramerVariant = animateY(-100, 0, firstIntersection, 0)
    const liVariants = Array.from(Array(3).keys()).map(key => {
        return animateX(100, 0, firstIntersection, key + 1)
    })

  return (
    <section ref={htmlElementRef} id='home-section-4' >
        <motion.div 
            initial="initial"
            animate="animate"
            variants={headerFramerVariant}
            className="home-section-header">
                Why Join?
        </motion.div>
        <div className='section-4-content'>
            <motion.div 
                initial="initial"
                animate="animate"
                variants={imgFramerVariant}
                className="laptop-lady-container">
                <img src={laptopLady} />
            </motion.div>
                <ul
                    className='reasons-ul'>
                    {reasons.map((reason, idx) => {
                        return (
                            <motion.li
                                variants={liVariants[idx]}
                                initial="initial"
                                animate="animate"
                                key={reason.text}
                                className='section-4-reason'
                            >
                                <PrivateGardenLogo />{reason.text}
                            </motion.li>
                        )
                    })}
                </ul>
        </div>
        <motion.div 
            initial="initial"
            animate="animate"
            variants={imgFramerVariant}
            className="banana-bottom-container">
            <img src={bananaBottom} />
        </motion.div>
    </section>
  )
}

export default HomeSection4

const reasons = [
    {
        text: 'Quick To Add Data'
    },
    {
        text: 'Straight Forward To Use'
    },
    {
        text: 'Learn From Your Process'
    },
]
