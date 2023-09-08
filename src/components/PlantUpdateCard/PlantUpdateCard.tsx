import { Plant, PlantUpdate } from '../../types/interface'
import checkedSVG from '/checked.png'
import redXsvg from '/redX.png'
import { plantUpdateManager } from '../../types/PlantUpdateManager'
import { useState } from 'react'
import Modal from '../Modal/Modal'
import logo from '/leaf-svgrepo-com.svg'
import { setCurrentUpdate } from '../../redux/plantsSlice'
import { useAppDispatch } from '../../redux/reduxHooks'
import EditButton from '../Button/EditButton'

interface PlantUpdateCardProps {
    plantUpdate: PlantUpdate
    currentPlant: Plant
    removeButtons: boolean
    checkBoxUpdate: any
    setEditPlantUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
}
interface PlantUpdateImageSectionProps {
    plantUpdateImages: string []
    dateAdded: number
}
const PlantUpdateImagesSection = ({plantUpdateImages, dateAdded}: PlantUpdateImageSectionProps) => {
    const [viewImages, setViewImages] = useState<boolean>(false)
    const howManyImages = plantUpdateImages.length
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
                            <div className='update-images-date'>
                                {plantUpdateManager.extractDateString(dateAdded)}
                            </div>
                            <div className='all-update-images-container'>
                                {plantUpdateImages.map(image => {
                                    return <div key={image} className='update-image-container'> 
                                        <img className='update-image' src={image} />
                                    </div>
                                })}
                            </div>
                            </div>
                    </Modal>
                }
        </div>
    }
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