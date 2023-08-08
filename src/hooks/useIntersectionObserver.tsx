import {useEffect, useState, useRef, useContext } from 'react'
// import { currentSectionContext } from '../providers/currentSectionProvider'
export const useIntersectionObserver = (sectionId: string) => {
    const [isVisible, setIsVisible] = useState(false)
    const [firstIntersection, setFirstIntersection] = useState(false)
    const htmlElementRef = useRef<HTMLElement | null>(null)
    // const { setCurrentSection } = useContext<any>(currentSectionContext);
    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {

            setIsVisible(entry.isIntersecting);
            if (entry.isIntersecting) {
              setTimeout(() => {
                setFirstIntersection(true)
              }, 500)
            //   setCurrentSection(sectionId)
            }
          },
          {
            rootMargin: "0px",
            threshold: 0.3,
          }
        );
    
        if (htmlElementRef.current) {
          observer.observe(htmlElementRef.current);
        }

        return () => {
          if (htmlElementRef.current || firstIntersection) {
            observer.unobserve(htmlElementRef.current!);
          }
        };
      }, [firstIntersection]);

      return {
        isVisible,
        firstIntersection,
        htmlElementRef
      }
}