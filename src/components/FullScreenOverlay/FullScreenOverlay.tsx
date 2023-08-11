import ReactDom from 'react-dom'

export default function FullScreenOverlay() {
    if (!open) return null;

    return ReactDom.createPortal(
        <>
                    <div className="overlay">

                    </div>  
                </>,
        document.getElementById('portal') as HTMLBodyElement
    )
}