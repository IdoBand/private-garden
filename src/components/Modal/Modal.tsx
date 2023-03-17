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
                    <div className="overlay">
                        <div className="modal">

                                <button className="x-button" onClick={onClose}>X</button>
                            <div className="modal-content">
                                {content}
                            </div>
                            
                        </div>
                    </div>  
                </>,
        document.getElementById('portal') as HTMLBodyElement
    )
}