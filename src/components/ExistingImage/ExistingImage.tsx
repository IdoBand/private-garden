import { XCircleIcon } from '../../util/svgs'
import { useState } from 'react'
interface ExistingImageProps {
    src: string,
    idx: number
    handleImageDelete: any
    imgClassName: string
    onClick?: () => void
}
const ExistingImage = ({src, idx, handleImageDelete, imgClassName, onClick}: ExistingImageProps) => {
    const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false)

    function handleDeleteClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        e.stopPropagation()
        setIsDeleteClicked(true)
        setTimeout(() => {
            handleImageDelete(idx)
        }, 400)
    }
    function handleImageClick() {
      if (onClick) {
        onClick()
      }
    }
  return (
    <div className={`existing-image-container ${isDeleteClicked ? 'fade-out' : ''}`}>
      <span className={`existing-image-x-span`}
            onClick={(e) => handleDeleteClick(e)}>
            <XCircleIcon className="x-icon" />
        </span>
        <img 
            key={src} 
            className={imgClassName}
            src={src}
            onClick={handleImageClick}
            />
    </div>
  )
}

export default ExistingImage