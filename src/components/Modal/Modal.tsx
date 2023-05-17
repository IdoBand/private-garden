import ReactDom from 'react-dom'
interface ModalProps {
    open: boolean;
    onClose: () => void;
    content: React.ReactNode;
}
export default function Modal({open, onClose, content}: ModalProps) {
    if (!open) return null;

    return ReactDom.createPortal(
        <>
                    <div className="overlay" onClick={onClose}>
                        <div className="modal" onClick={(e => e.stopPropagation())}>
                                <button className="x-button" onClick={onClose}>X</button>
                            <div className="modal-content"  onClick={(e => e.stopPropagation())}>
                                {content}
                            </div>
                            
                        </div>
                    </div>  
                </>,
        document.getElementById('portal') as HTMLBodyElement
    )
}