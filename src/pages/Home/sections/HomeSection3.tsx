import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from "react"
import { motion } from 'framer-motion'
import flowerTimeLapse from '/home-page/dahlia-flower-blooming-time-lapse.mp4'
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver"
import { animateY } from "../../../util/framerVariants"

const HomeSection3 = () => {
  const { htmlElementRef, firstIntersection } = useIntersectionObserver('3')
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollTrigger = ScrollTrigger.create({
      trigger: '#home-section-3',
      start: 'bottom bottom',
      end: `top+=1850`,
      pin: true,
      scrub: true,
    });

    const video = videoRef.current as HTMLVideoElement
    const setVideoFrame = (scrollPosition: number) => {
      video.currentTime = scrollPosition
    }
    
    gsap.to(
    '#gsap-scroll-video',
      {
      scrollTrigger: {
        trigger: '#home-section-3',
        start: `top top`,
        end: `top+=1850`,
        scrub: true,
        onUpdate: (e) => {
          const scrollPos = (e.scroller as any).scrollY
          setVideoFrame((scrollPos - e.start ) * 2 / 1000)
        }
      }
    })
    return () => {
      scrollTrigger.kill()
    };
  }, [])
  const framerVariant = animateY(50, 0, firstIntersection)
  return (
    <section id='home-section-3' ref={htmlElementRef}>
      <motion.span 
            initial="initial"
            animate="animate"
            variants={framerVariant}
            className="home-section-header-white">Follow Changes
        </motion.span>
      <video id='gsap-scroll-video' src={flowerTimeLapse} ref={videoRef} muted={true}/>
    </section>
  )
}

export default HomeSection3