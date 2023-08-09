import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver"
import { motion } from "framer-motion"
import { PrivateGardenLogo } from "../../../util/svgs"
import { animateY } from "../../../util/framerVariants"
import { Link } from "react-router-dom"
import adanit from '/home-page/adanit.png'
const HomeSection2 = () => {

    const { htmlElementRef, firstIntersection } = useIntersectionObserver('2')
    const ulFramerVariant = animateY(50, 0, firstIntersection)
    const imgFramerVariant = animateY(-100, 0, firstIntersection, 0.8)
  return (
    <section ref={htmlElementRef} id='home-section-2' className={firstIntersection ? 'active' : ''}>
        <motion.span 
            initial="initial"
            animate="animate"
            variants={ulFramerVariant}
            className="home-section-header">What You Can Do
        </motion.span>
        <ul className="sentences-ul">
            {sentences.map((sentence: Sentence) => {
                return (
                    <Section2Bubble
                        firstIntersection={firstIntersection}
                        sentence={sentence}
                        key={sentence.text} />)
            })}
        </ul>
        <motion.div 
            initial="initial"
            animate="animate"
            variants={imgFramerVariant}
            className="adanit-container">
            <img src={adanit} />
        </motion.div>
    </section>
  )
}

export default HomeSection2

interface Section2BubbleProps {
    sentence: Sentence
    firstIntersection: boolean
}

const Section2Bubble = ({sentence, firstIntersection}: Section2BubbleProps) => {
    return (
        <li className="home-section-2-bubble-skeleton">
            <motion.div
                initial={{ // this div contains the bg-color and grows into the skeleton div
                    opacity: 0,
                    height: 0,
                    width: 0,
                }}
                animate={{
                    opacity: firstIntersection ? 1 : 0,
                    height: firstIntersection ? "280px" : 0,
                    width: firstIntersection ? "280px" : 0,
                    transition: {
                        type: "spring",
                        stiffness: 50,
                        duration: 0.6,
                        delay: sentence.id * 0.3
                    }
                }}
                className='home-section-2-bubble-content-container'>
                <motion.div 
                    initial={{ // this div holds the sentence's data and changes opacity
                        opacity: 0,
                    }}
                        animate={{
                            opacity: firstIntersection ? 1 : 0,
                            transition: {
                                duration: 0.6,
                                delay: 0.5 + sentence.id * 0.4
                            }
                        }}
                                className='home-section-2-bubble-content'>
                    {sentence.text}
                    <Link to='/MyGarden' className='home-section-2-bubble-button'>
                        DISCOVER
                    </Link>
                    <PrivateGardenLogo fill="#fff"/>
                </motion.div>
            </motion.div>
        </li>
    )
}


interface Sentence {
    id: number
    text: string
}
const sentences: Sentence[] = [
    {
        id: 1,
        text: 'Identify plants species, names and more.',
    },
    {
        id: 2,
        text: 'Create a timeline for each plant.',
    },
    {
        id: 3,
        text: 'Monitor irrigations and various actions.',
    },
]
