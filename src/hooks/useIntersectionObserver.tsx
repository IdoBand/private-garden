import {useEffect, useState, useRef } from 'react'

export const useIntersectionObserver = (sectionId: string, threshold=0.3, callback?: any) => {
    const [isVisible, setIsVisible] = useState(false)
    const [firstIntersection, setFirstIntersection] = useState(false)
    const htmlElementRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsVisible(entry.isIntersecting);
            if (entry.isIntersecting) {
              setTimeout(() => {
                setFirstIntersection(true)
                if (callback) {
                  callback()
                }
              }, 500)
            //   setCurrentSection(sectionId)
            }
          },
          {
            rootMargin: "0px",
            threshold: threshold,
          }
        );
    
        if (htmlElementRef.current) {
          observer.observe(htmlElementRef.current);
        }

        return () => {
          if (htmlElementRef.current) {
            try {
              observer.unobserve(htmlElementRef.current!);
            } catch (err) {
              console.log(err);
            }
          }
        };
      }, [firstIntersection]);

      return {
        isVisible,
        firstIntersection,
        htmlElementRef
      }
}