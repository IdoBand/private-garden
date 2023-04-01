import {useState, useRef} from 'react'
import { useForm, Controller } from "react-hook-form";
import GreenButton from '../Button/GreenButton'
import Spinner from '../Spinner/Spinner'
import AddOrEditPlantForm from "../forms/AddPlantForm/AddOrEditPlantForm"
import { fetchIdentifyPlant } from '../../hooks/fetchers'
import Modal from '../Modal/Modal'
import { handleImageLoad } from '../../hooks/helpfulFunctions';
interface IdentifyPlantDataObject {
    plantImages: File[];
  }

export default function IdentifyPlant() {
    const [isFetching, setIsFetching] = useState(false)
    const [identifiedPlant, setIdentifiedPlant] = useState<null | string>(null)
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null)
    const [addPlantModal, setAddPlantModal] = useState(false)
    const [responseMessage, setResponseMessage] = useState<string>('')
    const { register, handleSubmit, reset, formState: { errors }, control, setError, clearErrors } = useForm();
    
    
    async function extractImageFromForm(data: IdentifyPlantDataObject) {
        setIsFetching(true)
        const result = await fetchIdentifyPlant(data.plantImages)
        setIdentifiedPlant(result)
        setIsFetching(false)
    }


    return (
        <>
        <div className="page-container">
                <div className="page-content">
                    <div id="my-garden-options">
                            <div className="text">
                                <div className="form-header">Upload up to 5 images to identify a plant!</div>
                                <div className="">Make sure that all images are showing the same plant.</div>
                            </div>
                        <div className="footer-message">
                            This feature is made possible thanks to <a className='a' href='https://my.plantnet.org/' target={'_blank'}>Pl@ntNet API</a>.
                            <br />
                            Results maybe inaccurate sometimes.
                        </div>
                    </div>
                    {isFetching ? <Spinner />
                                :
                    <div id="Identify-Plant-container">
                        <form className="form" onSubmit={handleSubmit(data => {
                            extractImageFromForm(data as IdentifyPlantDataObject);
                            })} id="add-plant-form">
                            <div className="image-select-container">
                                <label>Plant Image:</label>
                                <Controller
                                name="plantImages"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <>
                                        <input type="file" multiple onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0 && e.target.files.length < 6) {
                                            setIdentifiedPlant(null)
                                            setSelectedImageIdx(null)
                                            const selectedFiles = Array.from(e.target.files)
                                            field.onChange(selectedFiles)
                                            clearErrors('plantImages')
                                            setImageFiles(selectedFiles)
                                        } else {
                                            setImageFiles([])
                                            setError("plantImages", {
                                                type: "manual",
                                                message: "Upload 1 to 5 images please."
                                            });
                                        }
                                        }} />
                                        
                                    </>
                                    )}
                                />
                                {errors.plantImages && <span className="error-span">{errors.plantImages.message as string}</span>}
                            </div>
                            <div className="images-and-result">
                                {imageFiles && <> {
                                    imageFiles.map((imageFile, idx) => {
                                    return <img key={idx} 
                                                className='image-to-identify'
                                                id={selectedImageIdx === idx ? 'selected-profile-image' : ''}
                                                src={URL.createObjectURL(imageFile)} 
                                                onLoad={handleImageLoad} 
                                                onClick={() => setSelectedImageIdx(idx)}/>
                                    })
                                }
                                </>
                                            
                                }
                            </div>
                                {identifiedPlant && 
                                    <div className="identified-plant">
                                    Result: <br/>
                                    {identifiedPlant}<br/>
                                    Click on an image to select it as a profile image and add it to your garden.
                                    </div>
                                }
                            
                            {imageFiles.length > 0 &&  <>
                                <GreenButton onClick={handleSubmit} text="Identify"/>
                                {(identifiedPlant && (selectedImageIdx !== null)) && 
                                    <GreenButton onClick={() => setAddPlantModal(true)} text="Add to My Garden"/>}
                                                </>
                            }
                        </form>
                    </div>} 
                </div>
            </div>
            {addPlantModal && <Modal    open={addPlantModal} 
                                        onClose={() => setAddPlantModal(false)} 
                                        content={<AddOrEditPlantForm setModal={setAddPlantModal} 
                                                                        addOrEdit="add" setResponseMessage={setResponseMessage} 
                                                                        plantName={identifiedPlant} 
                                                                        plantImageString={URL.createObjectURL(imageFiles[selectedImageIdx as number] as File)} 
                                                                        />}></Modal>}
            {responseMessage && <Modal open={true} onClose={() => setResponseMessage('')} content={responseMessage}></Modal>}
        </>
    ) 
}