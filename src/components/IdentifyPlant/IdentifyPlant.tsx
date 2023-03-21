import {useState, useRef} from 'react'
import { useForm, Controller } from "react-hook-form";
import GreenButton from '../Button/GreenButton'
import Spinner from '../Spinner/Spinner'
import AddPlantForm from "../forms/AddPlantForm/AddPlantForm"
import { fetchIdentifyPlant } from '../../hooks/fetchers'
import Modal from '../Modal/Modal'
import { handleImageLoad } from '../../hooks/helpfulFunctions';
interface IdentifyPlantDataObject {
    plantImages: File[];
  }

export default function IdentifyPlant() {
    const [isFetching, setIsFetching] = useState(false)
    const [identifiedPlant, setIdentifiedPlant] = useState<null | string>(null)
    const [imageFile, setImageFile] = useState<null | File>(null)
    const [addPlantModal, setAddPlantModal] = useState(false)
    const [responseMessage, setResponseMessage] = useState<string>('')
    const { register, handleSubmit, reset, formState: { errors }, control, setError, clearErrors } = useForm();

    
    async function extractImageFromForm(data: IdentifyPlantDataObject) {
        setIsFetching(true)
        const result = await fetchIdentifyPlant(data.plantImages[0])
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
                                <div className="">Make sure that all images belong to the same plant</div>
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
                                        if (e.target.files && e.target.files.length > 0 && e.target.files.length == 1) {
                                            setIdentifiedPlant(null)
                                            const selectedFiles = Array.from(e.target.files)
                                            field.onChange(selectedFiles)
                                            clearErrors('plantImages')
                                            setImageFile(selectedFiles[0])
                                        } else {
                                            setImageFile(null)
                                            setError("plantImages", {
                                                type: "manual",
                                                message: "Only 1 image can be uploaded for now."
                                            });
                                        }
                                        }} />
                                        
                                    </>
                                    )}
                                />
                                {errors.plantImages && <span className="error-span">{errors.plantImages.message as string}</span>}
                            </div>
                            <div className="image-and-result">
                                {imageFile &&  <>
                                    <img className='image-to-identify' src={URL.createObjectURL(imageFile)} onLoad={handleImageLoad}/>
                                                </>
                                }
                                {identifiedPlant && 
                                    <div className="identified-plant">
                                    Result: <br/>
                                    {identifiedPlant}
                                    </div>
                                }
                            </div>
                            {imageFile &&  <>
                                <GreenButton onClick={handleSubmit} text="Identify"/>
                                {identifiedPlant && 
                                    <GreenButton onClick={() => setAddPlantModal(true)} text="Add to My Garden"/>}
                                                </>
                            }
                        </form>
                    </div>} 
                </div>
            </div>
            {addPlantModal && <Modal open={addPlantModal} onClose={() => setAddPlantModal(false)} content={<AddPlantForm setModal={setAddPlantModal} refetch={null} setResponseMessage={setResponseMessage} plantName={identifiedPlant} plantImage={imageFile}/>}></Modal>}
            {responseMessage && <Modal open={true} onClose={() => setResponseMessage('')} content={responseMessage}></Modal>}
        </>
    ) 
}