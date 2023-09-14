import { Plant, PlantUpdate } from '../../types/interface'
import checkedSVG from '/checked.png'
import redXsvg from '/redX.png'
import { plantUpdateManager } from '../../types/PlantUpdateManager'
import { useState, Dispatch, SetStateAction } from 'react'
import Modal from '../Modal/Modal'
import logo from '/leaf-svgrepo-com.svg'
import { setCurrentUpdate } from '../../redux/plantsSlice'
import { useAppDispatch } from '../../redux/reduxHooks'
import EditButton from '../Button/EditButton'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface PlantUpdateCardProps {
    plantUpdate: PlantUpdate
    currentPlant: Plant
    removeButtons: boolean
    checkBoxUpdate: any
    setEditPlantUpdateModal: Dispatch<SetStateAction<boolean>>
}


const PlantUpdateCard = ({plantUpdate, removeButtons, checkBoxUpdate, setEditPlantUpdateModal}: PlantUpdateCardProps) => {
    const dispatch = useAppDispatch()
    
    return (
    <div className="update-card">
        <div className="update-card-content">
            <div className="date-and-edit">
                <div className="card-date">{plantUpdateManager.extractDateString(plantUpdate.dateAdded)}</div>
                {removeButtons && <input
                            checked={plantUpdate.checked}
                            className="update-card-toggle"
                            type="checkbox"
                            onClick={(e) => e.stopPropagation()}
                            onChange={() => checkBoxUpdate(plantUpdate._id)}/>
                }
                <EditButton onClick={() => {dispatch(setCurrentUpdate(plantUpdate)) ;setEditPlantUpdateModal(true)}} isDisabled={removeButtons} />
            </div>
            <div className="info">
                <div className="update-card-irrigation-container">
                    <div className="update-card-subheader">
                        <div className="update-card-subheader">Irrigation {plantUpdate.irrigation.boolean as boolean ? <img className="checked-logo" src={checkedSVG}/> : <img className="checked-logo" src={redXsvg}/>} </div>
                    </div>
                    {plantUpdate.irrigation.boolean as boolean && 
                    <>
                        <section className="irrigation-section">
                            <div className="irrigation-subheader">Water Quantity:</div>
                            <div>{plantUpdate.irrigation.waterQuantity? `${plantUpdate.irrigation.waterQuantity.toString()} ml` : ''}</div>
                        </section>
                        <section className="irrigation-section">
                            <div className="irrigation-subheader">Fertilizer:</div>
                            <div>{plantUpdate.irrigation.fertilizer}</div>
                        </section>
                        <section className="irrigation-section">
                            <div className="irrigation-subheader">Fertilizer Quantity:</div>
                            <div>{plantUpdate.irrigation.fertilizerQuantity? `${plantUpdate.irrigation.fertilizerQuantity.toString()} ml` : ''}</div>
                        </section>
                    </>
                    }
                </div>
                <div className="update-card-notes-container">
                    <div className="update-card-subheader">
                        Notes {plantUpdate.notes ? <img className="checked-logo" src={checkedSVG}/> : <img className="checked-logo" src={redXsvg}/>}
                    </div>
                    <div className="actual-notes">
                        {plantUpdate.notes && plantUpdate.notes}
                    </div>
                        
                </div>
                <div className="update-card-images-container">
                    <div className="update-card-subheader">
                        Images {plantUpdate.images.length > 0 ? <img className="checked-logo" src={checkedSVG}/> : <img className="checked-logo" src={redXsvg}/>}
                    </div>
                    <PlantUpdateImagesSection plantUpdateImages={plantUpdate.images as string[]} dateAdded={plantUpdate.dateAdded as number}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PlantUpdateCard

//////////////////////////////////////////////////////////////////////////////////////////
interface PlantUpdateImageSectionProps {
    plantUpdateImages: string []
    dateAdded: number
}
const PlantUpdateImagesSection = ({plantUpdateImages, dateAdded}: PlantUpdateImageSectionProps) => {
    const [viewImages, setViewImages] = useState<boolean>(false)
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
    const howManyImages = plantUpdateImages.length

    function scrollToImage(upOrDown: number) {
        // upOrDown --> 0 = down, 1 = up
        const goToIndex = upOrDown ? currentImageIndex + 1 : currentImageIndex - 1
        const image = document.querySelector(`#update-image-${goToIndex}`)

        if (image) {
            image.scrollIntoView({ behavior: 'smooth' })
            setTimeout(() => {
                setCurrentImageIndex(goToIndex)
            }, 600)
        }
    }
    if (howManyImages < 1) {
        return <img className="no-update-images" src={logo} />
    } else {
        return <div>
            <img 
                onClick={() => setViewImages(true)}
                className="update-image-preview" 
                src={plantUpdateImages[0] as string} 
                />
                {viewImages &&
                    <Modal
                        onClose={() => setViewImages(false)}
                    >
                        <div className="update-images-modal-container">
                            <div className='image-view-scroll-buttons-container'>
                                <button type='button' onClick={() => scrollToImage(0)} className='image-view-scroll-button'><ChevronUpIcon width={20} /></button>
                                <button type='button' onClick={() => scrollToImage(1)} className='image-view-scroll-button'><ChevronDownIcon width={20} /></button>
                                <div className='update-images-date'>
                                    {plantUpdateManager.extractDateString(dateAdded)}
                                </div>
                            </div>
                            <div className='all-update-images-container'>
                                {plantUpdateImages.map((image, idx) => {
                                    return <UpdateImage key={image} image={image} idx={idx} setCurrentImageIndex={setCurrentImageIndex} />
                                })}
                            </div>
                        </div>
                    </Modal>
                }
        </div>
    }
}
//////////////////////////////////////////////////////////////////////////////////////////
interface UpdateImage {
    image: string
    idx: number
    setCurrentImageIndex: Dispatch<SetStateAction<number>>
}
const UpdateImage = ({image, idx, setCurrentImageIndex}: UpdateImage) => {
    
    const { htmlElementRef } = useIntersectionObserver('', 0.5, () => setCurrentImageIndex(idx))

    return (
        <section key={image} className='update-image-container' ref={htmlElementRef}> 
            <img className='update-image' id={`update-image-${idx}`} src={image} />
        </section>
    )
}
