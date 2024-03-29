export const animateY = (initial: number, final: number, shouldStart: boolean, delay?: number) => {
    return {
        initial: {
            opacity: 0,
            y: initial
        },
        animate: {
            y: shouldStart ? final : initial,
            opacity: shouldStart ? 1 : 0,
            transition: {
                duration: 0.5,
                delay: delay ? delay : 0
            }
        }
    }
}
export const animateX = (initial: number, final: number, shouldStart: boolean, delay?: number) => {
    return {
        initial: {
            opacity: 0,
            x: initial
        },
        animate: {
            x: shouldStart ? final : initial,
            opacity: shouldStart ? 1 : 0,
            transition: {
                duration: 0.5,
                delay: delay ? delay : 0
            }
        }
    }
}