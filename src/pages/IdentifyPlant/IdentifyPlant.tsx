import './IdentifyPlant.scss'
import { useRef, useState } from 'react'
import Button from '@components/Button/Button'
import Spinner from '@components/Spinner/Spinner'
import AddOrEditPlantForm from "@components/forms/AddPlantForm/AddOrEditPlantForm"
import { fetchIdentifyPlant } from '@util/fetch'
import Modal from '@components/Modal/Modal'
import { useSnackbar } from '@hooks/useSnackbar';
import { useUploadImages } from '@hooks/useUploadImages';
import { Plant } from '../../types/interface';
import { useAppSelector } from '@redux/reduxHooks';
import ExistingImage from '@components/ExistingImage/ExistingImage'
export default function IdentifyPlant() {
    const [isFetching, setIsFetching] = useState(false)
    const identifiedPlant = useRef<Plant | null>(null)
    const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null)
    const [addPlantModal, setAddPlantModal] = useState(false)
    const { show: showSnackbar, component: snackBar } = useSnackbar();
    const { imageFiles, filesInput, errorMessage, deleteImageFromArray, deleteAllImages } = useUploadImages(5, 0, false ,'images')
    const user = useAppSelector(state => state.window.user)
    async function handleIdentifyClick() {
        if (imageFiles.length) {
            try {
                setIsFetching(true)
                const result = await fetchIdentifyPlant(imageFiles)
                if (result.success) {
                    const plant: Plant = {
                        plantName: result.data,
                        img: '',
                        userId: user.id,
                        dateAdded: 0
                    }
                    identifiedPlant.current = plant
                } else {
                    throw Error (result.message)
                }
            } catch (err) {
                console.log(err);
                showSnackbar("Sorry, server error :(", "error")
            } finally {
                setIsFetching(false)
            }
        }
    }
    function handleClearClick() {
        deleteAllImages()
        setSelectedImageIdx(null)
        identifiedPlant.current = null
    }
    return (
        <div className='identify-plant-container'>
            <div className="identify-plant-options">
                <div className="identify-plant-text">
                    <div className="page-header">Upload up to 5 images to identify a plant!</div>
                    <div className="page-subheader">Please make sure that:
                        <div className="identify-constraints">
                            <div>&#x2022; All images are showing the same plant.</div>
                            <div>&#x2022; Plant is the main object of the image.</div>
                            <div>&#x2022; images are clear, not blurry.</div>
                        </div> 
                    </div>
                </div>
            </div>
            {isFetching ? 
            <div className='page Header'>
                <Spinner />
                This Might Take a Moment or Two...
            </div>
                        :
            <div className="form-container">
                <main>
                    <div className='identify-images-input-container'>
                        {filesInput}
                        {errorMessage}
                    </div>
                    <div className="images-and-result">
                    {imageFiles && 
                        <div className='identify-images-container'> {
                            imageFiles.map((imageFile, idx) => {
                                const url = URL.createObjectURL(imageFile)
                            return <ExistingImage 
                                key={url}
                                src={url}
                                idx={idx}
                                handleImageDelete={() => deleteImageFromArray(idx)}
                                imgClassName={selectedImageIdx === idx ? 'selected-profile-image' : 'image-to-identify '}
                                onClick={() => setSelectedImageIdx(idx)}
                                />

                            })
                        }
                        </div>
                    }
                    </div>
                        {identifiedPlant.current && imageFiles.length > 0 &&
                            <div className="identified-plant">
                            Result: <br/>
                            <span className='identified-plant-name'>{identifiedPlant.current!.plantName}</span><br/>
                            <div className='page-header'>Click on an image to select it as a profile image and add a new plant to your garden.</div>
                            </div>
                        }
                    
                    <div className='identify-buttons-container'>
                        {imageFiles.length > 0 &&  <>
                            <Button className='green-button blank' type="button" onClick={handleClearClick} text="Clear" isDisabled={isFetching}/>
                            <Button className='green-button' type="submit" onClick={handleIdentifyClick} text="Identify" isDisabled={isFetching}/>
                            {(identifiedPlant.current && (selectedImageIdx !== null) && user.id) &&
                            <Button className='green-button' type='button' onClick={() => setAddPlantModal(true)} text="Add to My Garden" isDisabled={selectedImageIdx === null}/>
                                }
                                </>
                        }
                    </div>
                </main>
            </div>} 
            <div className="footer-message">
                This feature is made possible thanks to <a className='a' href='https://my.plantnet.org/' target={'_blank'} rel="noreferrer">Pl@ntNet API</a>.
                <br />
                Results maybe inaccurate sometimes.
            </div>
            {addPlantModal && 
                <Modal
                    onClose={() => setAddPlantModal(false)} 
                >
                    <AddOrEditPlantForm 
                        setModal={setAddPlantModal} 
                        addOrEdit="add"
                        plant={{...identifiedPlant.current! , img: URL.createObjectURL(imageFiles[selectedImageIdx as number])}} 
                        showSnackbar={showSnackbar}
                        /> 
                </Modal>}
            {snackBar}
        </div>
    ) 
}