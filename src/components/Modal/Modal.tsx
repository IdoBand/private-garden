import ReactDom from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
export default function Modal({open, onClose, children}: ModalProps) {
    if (!open) return null;

    return ReactDom.createPortal(
        <>
                    <div className="overlay" onClick={onClose}>
                        <AnimatePresence>
                        <motion.div
                            initial={{
                                scale: 0,
                                opacity: 0,
                                translateX: '-50%',
                                translateY: '50%', 
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                translateX: '-50%',
                                translateY: '-50%',
                                transition: {
                                    duration: 0.3
                                }
                            }}
                            exit={{
                                scale: 0,
                                opacity: 0,
                                translateX: '-50%',
                                translateY: '50%',
                                transition: {
                                    duration: 0.3
                                },
                            }}
                            className="modal" onClick={(e => e.stopPropagation())}>
                            <button className="x-button" onClick={onClose}>X</button>
                            <div className="modal-content"  onClick={(e => e.stopPropagation())}>
                                {children}
                            </div>
                        </motion.div>
                        </AnimatePresence>
                    </div>  
                </>,
        document.getElementById('portal') as HTMLBodyElement
    )
}