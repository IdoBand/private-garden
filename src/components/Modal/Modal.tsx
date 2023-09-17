import './Modal.scss'
import ReactDom from 'react-dom'
import { motion } from 'framer-motion'
import { useState } from 'react';
interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}
export default function Modal({ onClose, children }: ModalProps) {
    const [active, setIsActive] = useState<boolean>(true)

    function handleOnClose() {
        setIsActive(false)
        setTimeout(() => {
            onClose()
        }, 350)
    }

    return ReactDom.createPortal(
        <>
                    <div className="overlay" onClick={handleOnClose}>
                        <motion.div
                            initial={{
                                scale: 0,
                                opacity: 0,
                                translateX: '-50%',
                                translateY: '50%', 
                            }}
                            animate={{
                                scale: active? 1 : 0,
                                opacity: active? 1 : 0,
                                translateX: '-50%',
                                translateY: active? '-50%' : '50%',
                                transition: {
                                    duration: 0.35
                                }
                            }}
                            className="modal" onClick={(e => e.stopPropagation())}>
                            <button className="x-button" onClick={handleOnClose}>X</button>
                            <div className="modal-content"  onClick={(e => e.stopPropagation())}>
                                {children}
                            </div>
                        </motion.div>
                    </div>  
                </>,
        document.getElementById('portal') as HTMLBodyElement
    )
}